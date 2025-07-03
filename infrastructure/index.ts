import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { Region } from "@pulumi/aws";

// Configure access and secret keys
const awsConfig = new pulumi.Config("aws");
const awsAccessKey = awsConfig.requireSecret("accessKey");
const awsSecretKey = awsConfig.requireSecret("secretKey");
const awsRegion: pulumi.Input<Region> = awsConfig.require("region") as pulumi.Input<Region>;

// Configure other secrets
const config = new pulumi.Config();
const certificateArn = config.requireSecret("certificateArn");

// Domain
const domain = "www.baopunny.studio";

// Configure AWS provider
const awsProvider = new aws.Provider("aws", {
    accessKey: awsAccessKey,
    secretKey: awsSecretKey,
    region: awsRegion
});

// Get certificate
/*const certificate = aws.acm.getCertificate(
  {
    domain,
    statuses: ["ISSUED"],      // ignore PENDING_VALIDATION / EXPIRED
    //mostSpecific: true,
  },
  { async: true }
);*/

// Create a security group allowing HTTP, HTTPS, and SSH
const webSg = new aws.ec2.SecurityGroup("web-sg",{
    description: "Allow HTTP, HTTPS, and SSH",
    ingress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },   // SSH
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },   // HTTP
        { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] }, // HTTPS
    ],
    egress: [
        { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },      // Allow all outbound
    ],
});

// Create key pair
const keyPairName = "baopun-website-key";
let keyPair: aws.ec2.KeyPair;
try {
    // Try to get the existing key pair
    keyPair = aws.ec2.KeyPair.get("existingKeyPair", keyPairName);
} catch (error) {
    // If the key pair doesn't exist, create a new one
    keyPair = new aws.ec2.KeyPair("baopun-website-keypair", {
        keyName: keyPairName,
        publicKey: "ssh-rsa XXX"
    }, {provider: awsProvider});
}

// Create a t2.micro EC2 instance
const instanceInfo = aws.ec2.getInstance({
    filters: [
        {
            name: "tag:Name",
            values: ['BaoWebServer'],
        },
    ],
}, { provider: awsProvider });


const instance = instanceInfo.then(
    // Retrieve existing instance
    info => aws.ec2.Instance.get("existing-instance", info.id),

    // Or create new one if does not exist
    () => new aws.ec2.Instance("web-server", {
        instanceType: "t2.micro",
        vpcSecurityGroupIds: [webSg.id],
        ami: 'ami-05ee755be0cd7555c', // Replace with your AMI
        keyName: keyPair.keyName,
        tags: {
            Name: "BaoWebServer",
            Environment: "development",
        },
    }, { provider: awsProvider })
);

/*new aws.ec2.Instance("web-server", {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [webSg.id],
    ami: 'ami-011e15a70256b7f26',
    keyName: keyPair.keyName, //Key pair is needed to SSH into the instance
    tags: {
        Name: "PulumiWebServer",
        Environment: "development",
    },
}, { provider: awsProvider });*/

// Get the default subnet
const defaultVpc    = aws.ec2.getVpc({ default: true }, { async: true });
const defaultSubnet = defaultVpc.then(vpc =>
  aws.ec2.getSubnets(
    {
      filters: [
        {
          name:   "vpc-id",
          values: [vpc.id],
        },
      ],
    },
    { async: true },
  ),
);

// Create an Application Load Balancer
const alb = new aws.lb.LoadBalancer("web-alb", {
    internal: false,
    loadBalancerType: "application",
    securityGroups: [webSg.id],
    subnets: defaultSubnet.then(r => r.ids),
    enableDeletionProtection: false,
}, { provider: awsProvider });

// Create a target group for the EC2 instance
const targetGroup = new aws.lb.TargetGroup("web-tg", {
    port: 80,
    protocol: "HTTP",
    targetType: "instance",
    vpcId: defaultVpc.then(v => v.id),
    healthCheck: {
        path: "/",
    },
}, { provider: awsProvider });

// Attach the EC2 instance to the target group
instance.then(inst =>
    new aws.lb.TargetGroupAttachment("web-tg-attachment", {
        targetGroupArn: targetGroup.arn,
        targetId: inst.id,
        port: 80,
    }, { provider: awsProvider })
);


// Create a listener for HTTPS using the ACM certificate
new aws.lb.Listener("web-https-listener", {
    loadBalancerArn: alb.arn,
    port: 443,
    protocol: "HTTPS",
    sslPolicy: "ELBSecurityPolicy-2016-08",
    certificateArn: certificateArn,
    defaultActions: [{
        type: "forward",
        targetGroupArn: targetGroup.arn,
    }],
}, { provider: awsProvider });

// Optionally, redirect HTTP to HTTPS
new aws.lb.Listener("web-http-listener", {
    loadBalancerArn: alb.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [{
        type: "redirect",
        redirect: {
            port: "443",
            protocol: "HTTPS",
            statusCode: "HTTP_301",
        },
    }],
}, { provider: awsProvider });

// Export the ALB DNS name
export const albDns = alb.dnsName;
/*export const publicIp = instance.then(i => i.publicIp);
export const publicDns = instance.then(i => i.publicDns);
export const keyName = keyPair.keyName;
export const publicId = instance.then(i => i.id);*/
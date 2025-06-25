import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { Region } from "@pulumi/aws";

// Configure access and secret keys
const awsConfig = new pulumi.Config("aws");
const awsAccessKey = awsConfig.requireSecret("accessKey");
const awsSecretKey = awsConfig.requireSecret("secretKey");
const awsRegion: pulumi.Input<Region> = awsConfig.require("region") as pulumi.Input<Region>;

// Configure AWS provider
const awsProvider = new aws.Provider("aws", {
    accessKey: awsAccessKey,
    secretKey: awsSecretKey,
    region: awsRegion
});

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

// Get the latest Amazon Linux 2 AMI
const ami = aws.ec2.getAmi({
    mostRecent: true,
    owners: ["amazon"],
    filters: [
        { name: "name", values: ["amzn2-ami-hvm-*-x86_64-gp2"] },
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
const server = new aws.ec2.Instance("web-server", {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [webSg.id],
    ami: 'ami-011e15a70256b7f26',
    keyName: keyPair.keyName, //Key pair is needed to SSH into the instance
    tags: {
        Name: "PulumiWebServer",
        Environment: "development",
    },
}, { provider: awsProvider });

export const publicIp = server.publicIp;
export const publicDns = server.publicDns;
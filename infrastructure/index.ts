import * as aws from "@pulumi/aws";

// Create a security group allowing HTTP, HTTPS, and SSH
const webSg = new aws.ec2.SecurityGroup("web-sg", {
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

// Create a t2.micro EC2 instance
const server = new aws.ec2.Instance("web-server", {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [webSg.id],
    ami: ami.then(a => a.id),
    tags: {
        Name: "PulumiWebServer",
    },
});

export const publicIp = server.publicIp;
export const publicDns = server.publicDns;
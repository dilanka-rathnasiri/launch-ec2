import * as aws from "@pulumi/aws";
import * as yaml from "js-yaml";
import * as fs from "fs/promises";
import {GetAmiResult} from "@pulumi/aws/ec2";
import {Output} from "@pulumi/pulumi";

const stack = async (): Promise<void> => {
    const f: string = await fs.readFile("configs.yaml", "utf-8");
    const configs: Record<string, any> = yaml.load(f) as Record<string, any>;

    const ami: GetAmiResult = await aws.ec2.getAmi({
        mostRecent: true,
        filters: [
            {
                name: "name",
                values: [configs.AMI_NAME],
            }, {
                name: "virtualization-type",
                values: ["hvm"],
            }
        ],
    });

    const instance = new aws.ec2.Instance(configs.INSTANCE_NAME, {
        ami: ami.id,
        instanceType: configs.INSTANCE_TYPE,
        subnetId: configs.SUBNET_ID,
        vpcSecurityGroupIds: [configs.SG_ID],
        iamInstanceProfile: configs.IAM_INSTANCE_PROFILE,
        tags: {
            Name: configs.INSTANCE_NAME,
            ...configs.TAGS
        },
    });
    const instanceIdOutput: Output<string> = instance.id.apply(id => {
        console.log(id);
        return id;
    });
}

stack();

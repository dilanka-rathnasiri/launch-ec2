const { RunInstancesCommand } = require("@aws-sdk/client-ec2");
const { createTagList } = require("../utils/tags");
module.exports.launchEc2 = async (client, configs, instanceProfile) => {
  if (
    !configs["ec2Name"] ||
    !configs["tags"] ||
    !configs["amiId"] ||
    !configs["instanceType"] ||
    !configs["sgIds"] ||
    !configs["subnetId"] ||
    !configs["enablePublicIp"]
  ) {
    throw new Error("Missing iamRoleName in configuration yaml");
  }
  const tags = {
    Name: configs["ec2Name"],
    Type: "Ec2",
    ...configs["tags"],
  };
  const command = new RunInstancesCommand({
    ImageId: configs["amiId"],
    InstanceType: configs["instanceType"],
    MaxCount: 1,
    MinCount: 1,
    SecurityGroupIds: configs["sgIds"],
    SubnetId: configs["subnetId"],
    IamInstanceProfile: {
      Arn: instanceProfile["InstanceProfileName"],
      Name: instanceProfile["Arn"],
    },
    NetworkInterfaces: [
      {
        AssociatePublicIpAddress: configs["enablePublicIp"],
        SubnetId: configs["subnetId"],
      },
    ],
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: createTagList(tags),
      },
    ],
    MetadataOptions: {
      HttpTokens: "required",
    },
  });
  const response = await client.send(command);
  if (!response.ok) {
    throw new Error(response.body);
  }
  console.log("Ec2 instance created");
  return response.body["Instances"][0];
};

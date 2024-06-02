const {
  CreateRoleCommand,
  CreateInstanceProfileCommand,
  AttachRolePolicyCommand,
} = require("@aws-sdk/client-iam");
const { createTagList } = require("../utils/tags");

module.exports.createIamRole = async (client, configs) => {
  if (!configs["iamRoleName"] || !configs["tags"]) {
    throw new Error("Missing iamRoleName in configuration yaml");
  }
  const assumeRolePolicyDoc = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { Service: "ec2.amazonaws.com" },
        Action: "sts:AssumeRole",
      },
    ],
  };
  const tags = {
    Name: configs["iamRoleName"],
    Type: "IamRole",
    ...configs["tags"],
  };
  const command = new CreateRoleCommand({
    RoleName: configs["iamRoleName"],
    AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicyDoc),
    Description: configs["iamRoleName"],
    Tags: createTagList(tags),
  });
  const response = await client.send(command);
  if (!response.ok) {
    throw new Error(response.body);
  }
  return response["Role"];
};

module.exports.attachPoliciesToRole = async (client, roleName, configs) => {
  if (!configs["policyArns"]) {
    throw new Error("Missing policyArns in configuration yaml");
  }
  const policyArns = configs["policyArns"];
  for (const arn of policyArns) {
    const command = new AttachRolePolicyCommand({
      RoleName: roleName,
      PolicyArn: arn,
    });
    const response = await client.send(command);
    if (!response.ok) {
      throw new Error(response.body);
    }
  }
};

module.exports.createIamInstanceProfile = async (client, configs) => {
  if (!configs["iamInstanceProfileName"] || configs["tags"]) {
    throw new Error(
      "Missing iamInstanceProfileName or tags in configuration yaml",
    );
  }
  const tags = {
    Name: configs["iamInstanceProfileName"],
    Type: "IamInstanceProfile",
    ...configs["tags"],
  };
  const command = new CreateInstanceProfileCommand({
    InstanceProfileName: configs["iamInstanceProfileName"],
    Tags: createTagList(tags),
  });
  const response = await client.send(command);
  if (!response.ok) {
    throw new Error(response.body);
  }
  console.log("IamInstanceProfile created");
  return response.body["InstanceProfile"];
};

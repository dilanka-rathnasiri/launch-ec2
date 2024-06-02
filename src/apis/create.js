const fs = require("node:fs/promises");
const yaml = require("js-yaml");
const { IAMClient } = require("@aws-sdk/client-iam");
const { EC2Client, RunInstancesCommand } = require("@aws-sdk/client-ec2");
const {
  createIamRole,
  attachPoliciesToRole,
  createIamInstanceProfile,
} = require("../services/iam");
const {launchEc2} = require("../services/ec2");

module.exports = async function (configFile) {
  try {
    // load configs from the yaml file
    const configsStr = await fs.readFile(configFile, "utf-8");
    const configs = yaml.load(configsStr, []);
    // create iam client
    const iamClient = new IAMClient();
    // create iam role
    const iamRole = await createIamRole(iamClient, configs);
    // attach policies to iam role
    await attachPoliciesToRole(iamClient, iamRole["RoleName"], configs);
    // create iam instance profile
    const iamProfile = await createIamInstanceProfile(iamClient, configs);
    // ec2 client
    const client = new EC2Client();
    // launch ec2
    await launchEc2(client, configs, iamProfile);
  } catch (error) {
    console.error(error);
  }
};

const { IAMClient } = require("@aws-sdk/client-iam");
const { EC2Client } = require("@aws-sdk/client-ec2");
const {
  createIamRole,
  attachPoliciesToRole,
  createIamInstanceProfile,
} = require("../services/iam");
const { launchEc2 } = require("../services/ec2");
const { loadConfigs } = require("../utils/file");

module.exports = async (configFile) => {
  try {
    // load configs from the yaml file
    const configs = await loadConfigs(configFile);
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
  } catch (err) {
    console.error(err);
  }
};

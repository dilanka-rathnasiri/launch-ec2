const fs = require("node:fs/promises");
const yaml = require("js-yaml");

module.exports.loadConfigs = async (configFile) => {
  const configsStr = await fs.readFile(configFile, "utf-8");
  return yaml.load(configsStr, []);
};

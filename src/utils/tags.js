module.exports.createTagList = (tags) => {
  const tagList = [];
  for (const [key, value] of Object.entries(tags)) {
    tagList.push({ Key: key, Value: value });
  }
  return tagList;
};

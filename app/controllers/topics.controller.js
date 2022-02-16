const models = require("../models");
exports.getTopics = async (req, res) => {
  const topicsList = await models.topics.selectTopics();
  res.status(200).send({ topics: topicsList });
};

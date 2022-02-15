const { topics } = require("../models");
exports.getTopics = async (req, res) => {
  const topicsList = await topics.selectTopics();
  res.status(200).send({ topics: topicsList });
};

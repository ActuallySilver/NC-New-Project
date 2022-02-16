const res = require("express/lib/response");
const models = require("../models");
exports.getUsers = async (req, res) => {
  const users = await models.users.selectUsers();
  res.status(200).send({ users });
};

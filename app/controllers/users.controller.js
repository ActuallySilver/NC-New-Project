const res = require("express/lib/response");
const models = require("../models");
exports.getUsers = async (req, res) => {
  const users = await models.users.selectUsers();
  res.status(200).send({ users });
};
exports.getUsersByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await models.users.selectUsersByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next({ error, type: "user" });
  }
};

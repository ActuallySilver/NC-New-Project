const db = require("../../db/connection");
exports.selectUsers = async () => {
  const { rows } = await db.query("SELECT * FROM users;");
  return rows;
};
exports.selectUsersByUsername = async (username) => {
  const { rows: users } = await db.query("SELECT * FROM users WHERE username = $1;", [username]);
  const [user] = users;
  if (!user) return Promise.reject({ status: 404, errMsg: "username not found" });
  return user;
};

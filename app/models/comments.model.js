const db = require("../../db/connection");

exports.selectCommentsByArticleID = async (id) => {
  const { rows: comments } = await db.query("SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1", [id]);
  return comments;
};
exports.insertCommentByArticleID = async (id, username, body) => {
  const {
    rows: [comment],
  } = await db.query("INSERT INTO comments (body, votes, author, article_id) VALUES ($1, $2, $3, $4) RETURNING *;", [
    body,
    0,
    username,
    id,
  ]);
  return comment;
};
exports.deleteCommentByID = (id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1", [id]);
};

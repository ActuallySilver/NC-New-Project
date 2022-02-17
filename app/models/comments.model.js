const db = require("../../db/connection");

exports.selectCommentsByArticleID = async (id) => {
  const { rows: articles } = await db.query("SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1", [id]);
  return articles;
};

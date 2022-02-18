const db = require("../../db/connection");
exports.selectArticleById = async (id) => {
  const { rows: articles } = await db.query("SELECT * FROM articles WHERE article_id = $1;", [id]);
  const [article] = articles;
  if (!article) return Promise.reject({ status: 404, errMsg: "article not found" });
  return article;
};

exports.updateArticleVotes = async (id, votes) => {
  const { rows: articles } = await db.query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;", [votes, id]);
  const [article] = articles;
  if (!article) return Promise.reject({ status: 404, errMsg: "article not found" });
  return article;
};

exports.selectArticles = async () => {
  const { rows: articles } = await db.query(
    `SELECT articles.article_id, articles.author, articles.created_at, articles.title, articles.topic, articles.votes, COUNT(comments.article_id)::int AS comment_count
     FROM articles
     LEFT JOIN comments ON comments.article_id = articles.article_id
     GROUP BY articles.article_id
     ORDER BY created_at DESC;`
  );
  return articles;
};

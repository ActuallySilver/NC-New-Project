const db = require("../../db/connection");
exports.selectArticleById = async (id) => {
  const { rows: articles } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [id]
  );
  const [article] = articles;
  if (article) return article;
  else return Promise.reject({ status: 404, errMsg: "article not found" });
};

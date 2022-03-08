const db = require("../../db/connection");
const { selectTopics } = require("./topics.model");
exports.selectArticleById = async (id) => {
  const { rows: articles } = await db.query(
    `SELECT articles.article_id, articles.author, articles.body, articles.created_at, articles.title, articles.topic, articles.votes, COUNT(comments.article_id)::int AS comment_count
     FROM articles
     LEFT JOIN comments ON comments.article_id = articles.article_id
     WHERE articles.article_id = $1
     GROUP BY articles.article_id;`,
    [id]
  );

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

exports.selectArticles = async (sort_by = "created_at", order = "DESC", topic) => {
  const availableQueries = {
    sort_by: ["title", "topic", "author", "body", "created_at", "votes"],
    order: ["ASC", "DESC"],
    topic: (await selectTopics()).map((topic) => topic.slug),
  };
  let queryStr = `SELECT articles.article_id, articles.author, articles.created_at, articles.title, articles.topic, articles.votes, COUNT(comments.article_id)::int AS comment_count
  FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id`;
  if (availableQueries.topic.indexOf(topic) !== -1) queryStr += ` WHERE articles.topic = '${topic}'`;
  else if (topic) return Promise.reject({ status: 404, errMsg: "topic not found" });
  queryStr += " GROUP BY articles.article_id";
  if (availableQueries.sort_by.indexOf(sort_by) !== -1) queryStr += ` ORDER BY articles.${sort_by}`;
  else return Promise.reject({ status: 400, errMsg: "invalid sort_by" });
  if (availableQueries.order.indexOf(order) !== -1) queryStr += ` ${order}`;
  else return Promise.reject({ status: 400, errMsg: "invalid order" });
  queryStr += ";";
  const { rows: articles } = await db.query(queryStr);
  return articles;
};

const app = require("../app/app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  db.end();
});

describe("/api", () => {
  test("404 - recieves back 'path not found'", () => {
    return request(app)
      .get("/invalid-path")
      .expect(404)
      .then(({ body: { errMsg } }) => {
        expect(errMsg).toBe("path not found");
      });
  });
  describe("GET", () => {
    test("Returns a 200 with no body", () => {
      return request(app).get("/api").expect(200);
    });
  });
  describe("/topics", () => {
    describe("GET", () => {
      test("200 - recieves back a list of topics with slug and description", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                })
              );
            });
          });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      test("200 - recieves back an article with required properties", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  topic: expect.any(String),
                  created_at: expect.stringMatching(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/),
                  votes: expect.any(Number),
                })
              );
            });
          });
      });
      test("articles are ordered by date of decending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).toBeSortedBy("created_at", { descending: true });
          });
      });
      test("200 - each article has a comment_count property", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach((article) => {
              expect(article.comment_count).toEqual(expect.any(Number));
            });
          });
      });
    });
    describe("/:article_id", () => {
      describe("cannot get article errors", () => {
        describe("GET", () => {
          test("400 - invalid article id", () => {
            return request(app)
              .get("/api/articles/invalid-id")
              .expect(400)
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("invalid article id");
              });
          });
          test("404 - article not found", () => {
            return request(app)
              .get("/api/articles/7400")
              .expect(404)
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("article not found");
              });
          });
        });
        describe("PATCH", () => {
          //PATCH
          test("400 - invalid article id", () => {
            return request(app)
              .patch("/api/articles/invalid-id")
              .send({ inc_votes: 10 })
              .expect(400)
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("invalid article id");
              });
          });
          test("404 - article not found", () => {
            return request(app)
              .patch("/api/articles/7400")
              .send({ inc_votes: 10 })
              .expect(404)
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("article not found");
              });
          });
        });
      });
      describe("GET", () => {
        test("200 - recieves back an article with required properties", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).toEqual(
                expect.objectContaining({
                  author: "butter_bridge",
                  title: "Living in the shadow of a great man",
                  article_id: 1,
                  body: "I find this existence challenging",
                  topic: "mitch",
                  created_at: expect.stringMatching(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/),
                  votes: expect.any(Number),
                })
              );
            });
        });
        test("200 - each article has a comment_count property", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.comment_count).toBe("11");
            });
        });
      });
      describe("PATCH", () => {
        test("200 - recieves back the article with the correct values after being altered", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 10 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  author: "butter_bridge",
                  body: "I find this existence challenging",
                  votes: 110,
                  created_at: expect.stringMatching(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/),
                })
              );
            });
        });
        test("400 - error given for no inc_votes property", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ body: { errMsg } }) => {
              expect(errMsg).toBe("no inc_votes present");
            });
        });
      });
      describe("/comments", () => {
        describe("GET", () => {
          test("200 - recieves back a list of comments on the article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments.length).toBe(11);
                comments.forEach((comment) => {
                  expect(comment).toEqual(
                    expect.objectContaining({
                      body: expect.any(String),
                      votes: expect.any(Number),
                      author: expect.any(String),
                      comment_id: expect.any(Number),
                      created_at: expect.stringMatching(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/),
                    })
                  );
                });
              });
          });
          test("200 - gets back empty list if an article has no comments", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments.length).toBe(0);
              });
          });
          test("404 - if article entered does not exist", () => {
            return request(app)
              .get("/api/articles/99/comments")
              .expect(404)
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("article not found");
              });
          });
        });
        describe("POST", () => {
          test("201 - Responds back with the newly created comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(201)
              .send({ username: "rogersop", body: "Test Body" })
              .then(({ body: { comment } }) => {
                expect(comment).toEqual(
                  expect.objectContaining({
                    body: "Test Body",
                    votes: 0,
                    author: "rogersop",
                    article_id: 1,
                    created_at: expect.stringMatching(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/),
                  })
                );
              });
          });
          test("400 - Did not contain the required properties of username and body", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(400)
              .send({ body: "Test Body" })
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("required inputs not given");
              });
          });
          test("404 - article not found", () => {
            return request(app)
              .post("/api/articles/1000/comments")
              .expect(404)
              .send({ body: "Test Body", username: "rogersop" })
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("article not found");
              });
          });
          test("400 - invalid article id", () => {
            return request(app)
              .post("/api/articles/invalid-id/comments")
              .expect(400)
              .send({ body: "Test Body", username: "rogersop" })
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("invalid article id");
              });
          });
          test("404 - author not found", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(404)
              .send({ body: "Test Body", username: "rogersssop" })
              .then(({ body: { errMsg } }) => {
                expect(errMsg).toBe("author not found");
              });
          });
        });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      test("200 - recieves back a list of users with username and name and avatar_url", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            users.forEach((user) => {
              expect(user).toEqual(
                expect.objectContaining({
                  username: expect.any(String),
                  name: expect.any(String),
                  avatar_url: expect.any(String),
                })
              );
            });
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      describe("DELETE", () => {
        test("204 - Deleted comment successfully", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204)
            .then(({ body }) => {
              expect(body).toEqual({});
            });
        });
        test("400 - invalid comment id", () => {
          return request(app)
            .delete("/api/comments/invalid-id")
            .expect(400)
            .then(({ body: { errMsg } }) => {
              expect(errMsg).toBe("invalid comment id");
            });
        });
        test("404 - comment id not found", () => {
          return request(app)
            .delete("/api/comments/90119")
            .expect(404)
            .then(({ body: { errMsg } }) => {
              expect(errMsg).toBe("comment not found");
            });
        });
      });
    });
  });
});

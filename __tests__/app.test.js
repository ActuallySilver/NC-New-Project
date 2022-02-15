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
      .then(({ body: { msg } }) => {
        expect(msg).toBe("path not found");
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
  describe("/articles", () => {});
});

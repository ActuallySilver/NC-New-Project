exports.allOkay = (req, res) => {
  res.status(200).send({
    endpoints: {
      "GET /api": {
        description: "serves up a json representation of all the available endpoints of the api",
      },
      "GET /api/topics": {
        description: "serves an array of all topics",
        queries: [],
        exampleResponse: {
          topics: [{ slug: "football", description: "Footie!" }],
        },
      },
      "GET /api/articles": {
        description: "serves an array of all articles",
        queries: ["author", "topic", "sort_by", "order"],
        exampleResponse: {
          articles: [
            {
              title: "Seafood substitutions are increasing",
              topic: "cooking",
              author: "weegembump",
              body: "Text from the article..",
              created_at: 1527695953341,
            },
          ],
        },
      },
      "GET /api/articles/:article_id": {
        description: "servers a single article",
        queries: [],
        exampleResponse: {
          article: {
            article_id: 1,
            author: "jessjelly",
            body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: "2020-11-07T06:03:00.000Z",
            title: "Running a Node App",
            topic: "coding",
            votes: 0,
            comment_count: 8,
          },
        },
      },
      "PATCH /api/articles/:article_id": {
        description: "creates a new article in database and serves created article",
        queries: [],
        exampleResponse: {
          article: {
            article_id: 1,
            author: "jessjelly",
            body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: "2020-11-07T06:03:00.000Z",
            title: "Running a Node App",
            topic: "coding",
            votes: 0,
            comment_count: 8,
          },
        },
      },
      "POST /api/articles/:article_id/comments": {
        description: "serves an array of all comments for given article",
        queries: [],
        exampleResponse: {
          comments: [
            {
              comment_id: 31,
              votes: 11,
              created_at: "2020-09-26T17:16:00.000Z",
              author: "weegembump",
              body: "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
            },
            {
              comment_id: 33,
              votes: 4,
              created_at: "2019-12-31T21:21:00.000Z",
              author: "cooljmessy",
              body: "Explicabo perspiciatis voluptatem sunt tenetur maxime aut. Optio totam modi. Perspiciatis et quia.",
            },
          ],
        },
        "DELETE /api/comments/:comment_id": {
          description: "deletes a comment",
          queries: [],
          exampleResponse: 200,
        },
        "GET /api/users": {
          description: "serves an array of all users",
          queries: [],
          exampleResponse: {
            users: [
              {
                username: "tickle122",
                name: "Tom Tickle",
                avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
              },
              {
                username: "grumpy19",
                name: "Paul Grump",
                avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
              },
            ],
          },
        },
      },
      "GET /api/users": {
        description: "serves an array of all users",
        queries: [],
        exampleResponse: {
          users: [
            {
              username: "tickle122",
              name: "Tom Tickle",
              avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
            },
            {
              username: "grumpy19",
              name: "Paul Grump",
              avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
            },
          ],
        },
      },
    },
  });
};

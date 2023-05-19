const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  console.log("reaches testing endpoint");
  response.status(204).end();
});

module.exports = testingRouter;

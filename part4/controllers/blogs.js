const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({});
  if (allBlogs) {
    response.json(allBlogs);
  } else {
    response.status(404).end();
  }
  //   .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Title or url missing" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;

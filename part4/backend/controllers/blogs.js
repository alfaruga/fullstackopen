const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/:id", async (request, response) => {
  console.log("did it try from the server?");
  const blogInDb = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  console.log("this should be the blog in DB ", blogInDb);
  response.json(blogInDb);
});
blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  if (allBlogs) {
    response.json(allBlogs);
  } else {
    response.status(404).end();
  }
  //   .catch((error) => next(error));
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog];
  await user.save();
  console.log("this is from the BE", savedBlog);
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const authorDeletingId = request.user.id.toString();
  const blogObject = await Blog.findById(request.params.id);
  const originalAuthor = blogObject.user.toString();
  if (authorDeletingId === originalAuthor) {
    await Blog.findByIdAndDelete(request.params.id);
  } else {
    return response
      .status(401)
      .json({ error: "You're not allowed to delete blogs from other users" });
  }

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = await Blog.findById(request.params.id);

  console.log("request s, from back end!", body);
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes: body.likes + 1,
    },
    {
      new: true,
    }
  );
  
  response.status(201).json(updatedBlog)
  
  
  
});
module.exports = blogsRouter;

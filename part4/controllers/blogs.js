const bloggsRouter = require("express").Router();
const Blogg = require("../models/blog");

bloggsRouter.get("/", (request, response, next) => {
  Blogg.find({})
    .then((allBlogs) => {
      if (allBlogs) {
        response.json(allBlogs);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

bloggsRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blogg = new Blogg({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blogg
  .save()
  .then(savedBlogg=>{
    response.status(201).json(savedBlogg)
  })
  .catch(error=>next(error))
});


module.exports = bloggsRouter
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { request } = require("../app");
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  if (!password || password.length < 3) {
    return response.status(401).json({
      error: "Passwords must be at least 3 characters long",
    });
  }

  console.log("request body!", request.body);
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userToPost = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await userToPost.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  if (users) {
    response.json(users);
  } else {
    response.status(404).end();
  }
});

module.exports = usersRouter;

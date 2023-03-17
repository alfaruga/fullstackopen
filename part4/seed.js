const express = require("express");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");

require('dotenv')
const mongoose = require("mongoose");
const User = require("./models/user");
const Blog = require("./models/blog");
const helper = require('./tests/test_helper')



mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Ready to seed");
  })
  .catch((error) => {
    logger.error("error while connectingto MongoDB:", error.message);
  });


  const seedFunction = async () =>{
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers)
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)

  }

  seedFunction().then(()=>{
    mongoose.connection.close()
  })
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const middleware = require("./utils/middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error while connectingto MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
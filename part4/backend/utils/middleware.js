const { response } = require("express");
const logger = require("./logger");
const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const requestLogger = (request, response, next) => {
  logger.info("Method", request.method);
  logger.info("Path", request.path);
  logger.info("Body", request.body);
  logger.info("---");
  next();
};
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};
//This prevents unidentified users to modify or add data
const userExtractor = async (request, response, next) => {
  const decodedToken = jsonWebToken.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }
  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message, error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformattedid" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }
};

module.exports = {
  errorHandler,
  userExtractor,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
};

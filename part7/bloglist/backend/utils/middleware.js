const jwt = require("jsonwebtoken");

const User = require("../models/user");

const logger = (request, response, next) => {
  console.log(
    `${request.method}: ${request.originalUrl} - ${JSON.stringify(
      request.body
    )}`
  );
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }

  request.user = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  userExtractor,
};

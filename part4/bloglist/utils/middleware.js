const jwt = require("jsonwebtoken");
const logger = require("./logger");
const { SECRET } = require("../utils/config");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, SECRET);
    const userId = decodedToken.id;
    if (!userId) {
      return response.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(userId);
    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  errorHandler,
  getTokenFrom,
  userExtractor,
};

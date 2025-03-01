const jwt = require("jsonwebtoken");

const { RequestError } = require("../../helpers/RequestError");

const { User } = require("../../models/users");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Unauthorized";

    next(error);
  }
};

module.exports = auth;

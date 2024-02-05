const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw { name: "invalid_token" };
    }

    const access_token = token.split(" ")[1];

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalid_token" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;

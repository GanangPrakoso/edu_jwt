const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { comparePasword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const createUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        message: `user with email ${createUser.email} has been created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "email/password_required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "invalid_email/password" };
      }

      const passwordValidation = comparePasword(password, findUser.password);
      if (!passwordValidation) {
        throw { name: "invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { comparePasword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res) {
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
      res.status(500).json({ message: "ISE" });
    }
  }

  static async login(req, res) {
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
      if (err.name === "invalid_email/password") {
        res.status(404).json({ message: "user not found" });
      } else if (err.name === "email/password_required") {
        res.status(400).json({ message: "email/password is required" });
      } else {
        res.status(500).json({ message: "ISE" });
      }
    }
  }
}

module.exports = UserController;

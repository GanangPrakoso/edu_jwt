const router = require("express").Router();
const { comparePasword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

router.post("/register", async (req, res) => {
  try {
    // nangkep data dari body
    const { email, password } = req.body;

    // create user
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
});

// kita urusin si login nya!!!!!
router.post("/login", async (req, res) => {
  try {
    // tangkep data dari body
    const { email, password } = req.body;

    // cari user ke database
    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw { name: "invalid_email/password" };
    }

    // compare password
    const passwordValidation = comparePasword(password, findUser.password);
    if (!passwordValidation) {
      throw { name: "invalid_email/password" };
    }

    // kita kasih tokennya
    const payload = {
      id: findUser.id,
    };

    const access_token = createToken(payload);

    res.status(200).json({ access_token });
  } catch (err) {
    if (err.name === "invalid_email/password") {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(500).json({ message: "ISE" });
    }
  }
});

module.exports = router;

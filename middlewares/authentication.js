const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    // 1. cek apakah client mengirimkan headers access_token
    let access_token = req.headers.authorization;

    if (!access_token) {
      throw { name: "unauthenticated" };
    }

    // 1.a. split untuk dapat jwt
    access_token = access_token.split(" ")[1];
    console.log({ access_token });

    // 2. decode si access_token
    const payload = verifyToken(access_token);

    // 3. cek apakah user benar2 ada di db
    const findUser = await User.findByPk(payload.id);
    if (!findUser) {
      throw { name: "unauthenticated" };
    }

    // 4. simpan data ke req => sementara => response req bakal kosong
    req.user = {
      id: findUser.id,
      email: findUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;

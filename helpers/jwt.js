const jwt = require("jsonwebtoken");
const INI_KONCI = process.env.JWT_SECRET;

const createToken = (payload) => jwt.sign(payload, INI_KONCI);
const verifyToken = (token) => jwt.verify(token, INI_KONCI);

module.exports = {
  createToken,
  verifyToken,
};

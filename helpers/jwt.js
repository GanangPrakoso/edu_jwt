const jwt = require("jsonwebtoken");
const INI_KONCI = "ini_ga_aman_bos_q";

const createToken = (payload) => jwt.sign(payload, INI_KONCI);

const verifyToken = (token) => jwt.verify(token, INI_KONCI);

module.exports = {
  createToken,
  verifyToken,
};

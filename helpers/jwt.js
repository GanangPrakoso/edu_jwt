const jwt = require("jsonwebtoken");
const INI_KONCI = "ebel_cobra";

const createToken = (payload) => jwt.sign(payload, INI_KONCI);

module.exports = {
  createToken,
};

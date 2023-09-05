const jwt = require("jsonwebtoken");
const JWT_SECRET = "ebel_cobra";

const signToken = (payload) => jwt.sign(payload, JWT_SECRET);

module.exports = {
  signToken,
};

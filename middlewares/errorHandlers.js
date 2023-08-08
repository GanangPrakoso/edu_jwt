function errorHandler(err, req, res, next) {
  console.log(err, "<<<< DI ERROR HANDLER");

  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "invalid_email/password") {
    status = 401;
    message = "email/password invalid";
  } else if (err.name === "email/password_required") {
    status = 400;
    message = "email/password is required";
  } else if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;

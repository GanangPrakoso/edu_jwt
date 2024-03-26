function errorHandler(err, req, res, next) {
  console.log(err, "<<< err di error handler");
  let message = "internal server error";
  let code = 500;

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "invalid token";
  } else if (err.name === "unauthorized") {
    code = 403;
    message = "unauthorized";
  } else if (err.name === "not found") {
    code = 404;
    message = `${err.type} not found`;
  } else if (err.name === "please provide a picture") {
    code = 400;
    message = err.name;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;

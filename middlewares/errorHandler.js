const errorHandler = (err, req, res, next) => {
  console.log(err, "<<<< INI ERROR");

  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "invalid token";
  } else if (err.name === "data_not_found") {
    code = 404;
    message = "Movie not found";
  } else if (err.name === "forbidden") {
    code = 403;
    message = "Forbidden";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;

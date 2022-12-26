const handleError = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = handleError;

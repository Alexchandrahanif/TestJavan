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
  } else if (err.name === "Data User Not Found") {
    (code = 400), (message = `Data User With Id ${err.id} Not Found`);
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;

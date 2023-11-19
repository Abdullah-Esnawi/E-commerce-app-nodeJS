const devErr = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const productionErr = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErr(error, res);
  } else if (process.env.NODE_ENV === "production") {
    productionErr(error, res);
  }
};

module.exports = globalError;

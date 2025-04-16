const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
  // const error = new Error();
  // error.status = err.status || 404;
  // error.message = err.message || "Not Found";

  // next(error);
}

export default notFound
export const handleErrors = (err, req, res, next) => {
  const { code, message } = err;
  return res.status(code).json({
    status: code,
    message: message
  });
};

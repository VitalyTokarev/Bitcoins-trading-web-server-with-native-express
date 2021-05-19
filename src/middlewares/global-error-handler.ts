// eslint-disable-next-line no-unused-vars
namespace GlobalErrorHandler {
  module.exports.handleErrors = (err, req, res, next) => {
    console.log(err);
    const { code, message } = err;
    return res.status(code || 500).json({
      status: code,
      message: message
    });
  };

  module.exports.asyncHandler = fn => (req, res, next) => {
    return Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
}

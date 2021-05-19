// eslint-disable-next-line no-unused-vars
namespace Errors {
  class ErrorHandler extends Error {
    code: number;
    message: string;
    constructor (code, message) {
      super();
      this.code = code;
      this.message = message;
    }
  }

  module.exports.ErrorHandler = ErrorHandler;
  module.exports.userNotFound = function (): ErrorHandler {
    return new ErrorHandler(404, 'User not found!');
  };
  module.exports.error = function (err: ErrorHandler): ErrorHandler {
    return new ErrorHandler(err.code || 500, err.message || err);
  };
  module.exports.insufficientFunds = function (): ErrorHandler {
    return new ErrorHandler(422, 'Insufficient funds for the account');
  };
}

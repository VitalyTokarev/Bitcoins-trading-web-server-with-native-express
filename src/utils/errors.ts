export class ErrorHandler extends Error {
    code: number;
    message: string;
    constructor (code, message) {
      super();
      this.code = code;
      this.message = message;
    }
}

export function userNotFound (): ErrorHandler {
  return new ErrorHandler(404, 'User not found!');
};
export function error (err: ErrorHandler): ErrorHandler {
  return new ErrorHandler(err.code || 500, err.message || err);
};
export function insufficientFunds (): ErrorHandler {
  return new ErrorHandler(422, 'Insufficient funds for the account');
};

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
}

import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(400, `authentication token is missing`);
  }
}

export default AuthenticationTokenMissingException;

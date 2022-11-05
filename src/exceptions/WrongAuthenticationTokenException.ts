import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(400, `authentication token is invalid`);
  }
}

export default WrongAuthenticationTokenException;

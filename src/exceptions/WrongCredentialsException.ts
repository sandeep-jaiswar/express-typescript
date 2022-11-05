import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, `credential is invalid`);
  }
}

export default WrongCredentialsException;

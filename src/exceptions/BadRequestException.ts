import HttpException from './HttpException';

class BadRequestException extends HttpException {
  constructor() {
    super(400, `Something went wrong`);
  }
}

export default BadRequestException;

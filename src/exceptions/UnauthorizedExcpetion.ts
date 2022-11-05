import HttpException from './HttpException';

class UnauthorizedExcpetion extends HttpException {
  constructor() {
    super(401, `user does not have permission to perform this action`);
  }
}

export default UnauthorizedExcpetion;

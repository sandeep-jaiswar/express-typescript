import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `data with ${id} does not exist`);
  }
}

export default NotFoundException;

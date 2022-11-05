import HttpException from './HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `user with emailid as ${email} already exists`);
  }
}

export default UserWithThatEmailAlreadyExistsException;

import { Request } from 'express';
import User from 'features/users/user.interface';

interface RequestWithFile extends Request {
  files: Array<Object>;
}

export default RequestWithFile;

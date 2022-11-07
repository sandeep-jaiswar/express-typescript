import { NextFunction, Response } from 'express';
import DataStoredInToken from 'interfaces/DataStoredInToken.interface';
import RequestWithUser from 'interfaces/RequestWithUser.interface';
import * as jwt from 'jsonwebtoken';
import userModel from 'features/users/user.model';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const token =
    request.headers.authorization &&
    request.headers.authorization.split(' ')[1];
  if (token && token.length > 0) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        token,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;

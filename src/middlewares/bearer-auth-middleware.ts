import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden-error-model';
import JWT from 'jsonwebtoken';
import userRepository from '../repositories/user-repository';

const bearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenError('credentials not entered');
    }

    const [authType, token] = authHeader.split(' ');

    if (authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Invalid type of authentication');
    }

    const tokenPayload = JWT.verify(token, 'my_secret_key');

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Invalid Token');
    }

    const uuid = tokenPayload.sub;
    const user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username,
    };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default bearerAuthMiddleware;

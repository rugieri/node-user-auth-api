import { NextFunction, Request, Response, Router } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthMiddleware from '../middlewares/basic-auth-middleware';
import ForbiddenError from '../models/errors/forbidden-error-model';

const authRoute = Router();

authRoute.post(
  '/token',
  basicAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError('User not entered!');
      }
      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = 'my_secret_key';

      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authRoute;

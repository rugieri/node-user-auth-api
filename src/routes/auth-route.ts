import { NextFunction, Request, Response, Router } from 'express';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthMiddleware from '../middlewares/basic-auth-middleware';
import ForbiddenError from '../models/errors/forbidden-error-model';
import jwtAuthMiddleware from '../middlewares/jwt-auth-middleware';

const authRoute = Router();

authRoute.post(
  '/token/validate',
  jwtAuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

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
      const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '20m' };
      const secretKey = 'my_secret_key';

      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authRoute;

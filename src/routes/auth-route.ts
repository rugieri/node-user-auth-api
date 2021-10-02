import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden-error-model';
import userRepository from '../repositories/user-repository';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authRoute = Router();

authRoute.post(
  '/token',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        throw new ForbiddenError('credentials not entered');
      }

      const [authType, token] = authHeader.split(' ');

      if (authType !== 'Basic' || !token) {
        throw new ForbiddenError('invalid credentials!');
      }

      const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

      const [username, password] = tokenContent.split(':');

      if (!username || !password) {
        throw new ForbiddenError('credentials not entered');
      }
      const user = await userRepository.findByUsernameAndPassword(
        username,
        password
      );
      if (!user) {
        throw new ForbiddenError('invalid user and password!');
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

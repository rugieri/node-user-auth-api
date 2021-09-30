import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden-error-model';

const authRoute = Router();

authRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenError('credentials not entered');
    }

    const [authType, token] = authHeader.split(' ');

    if (authType !== 'Basic' || !token) {
      throw new ForbiddenError('invalid credentials!');
    }
  } catch (error) {
    next(error);
  }
});

export default authRoute;

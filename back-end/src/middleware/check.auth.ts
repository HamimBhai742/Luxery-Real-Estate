import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { verifyJwtToken } from '../utils/create.token';
import { ENV } from '../config/env';
import { AppError } from '../error/coustom.error';
export const checkAuth =
  (...roles: string[]) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req?.cookies?.accessToken || req?.headers?.authorization;
      if (!token) {
        throw new AppError(
          'Access token is missing or not provided',
          httpStatusCode.UNAUTHORIZED
        );
      }
      const decod = verifyJwtToken(token, ENV.JWT_SECRET);

      if (!roles.includes(decod.role)) {
        throw new AppError(
          'You are not authorized to access this route',
          httpStatusCode.UNAUTHORIZED
        );
      }

      req.user = decod;
      next();
    } catch (error) {
      next(error);
    }
  };
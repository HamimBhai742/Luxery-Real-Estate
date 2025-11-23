import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
export const validateRequest =
  (zod: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zod.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

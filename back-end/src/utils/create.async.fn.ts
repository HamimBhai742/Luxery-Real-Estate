import { NextFunction, Request, Response } from 'express';

type asyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
export const createAsyncFn =
  (fn: asyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => next(err));
  };

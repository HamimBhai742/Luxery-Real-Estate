import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { authService } from './auth.services';
import { createUserToken } from '../../utils/create.jwt';
import { sendResponse } from '../../utils/send.response';
import { setCookies } from '../../utils/set.cookies';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';

const login = createAsyncFn(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await authService.login({ email, password });
  if (user) {
    const token = await createUserToken(user);

    setCookies(res, token);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: 'User logged in successfully',
      data: token,
    });
  }
});



const verifyUser = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: 'User logged in',
      data: req.user,
    });
  }
);

export const authController = {
  login,
  verifyUser,
};

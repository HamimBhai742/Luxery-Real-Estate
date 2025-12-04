import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { authService } from './auth.services';
import { createUserToken } from '../../utils/create.jwt';
import { sendResponse } from '../../utils/send.response';
import { setCookies } from '../../utils/set.cookies';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
import { ENV } from '../../config/env';

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
      data: user,
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

const logout = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: 'User logged out',
      data: null,
    });
  }
);

const forgetPassword = createAsyncFn(async (req: Request, res: Response) => {
  const data = await authService.forgetPassword(req.body.email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Reset Link Sent Successfully',
    data: null,
  });
});

const resetPassword = createAsyncFn(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const data = await authService.resetPassword(token, password);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Password Changed Successfully',
    data: null,
  });
});

export const authController = {
  login,
  verifyUser,
  logout,
  forgetPassword,
  resetPassword,
};

import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { authService } from './auth.services';
import { createUserToken } from '../../utils/create.jwt';
import { sendResponse } from '../../utils/send.response';
import { setCookies } from '../../utils/set.cookies';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
import { ENV } from '../../config/env';
import { AppError } from '../../error/coustom.error';
import passport from 'passport';

const login = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(err, 403));
      }
      if (!user) {
        return next(new AppError(info.message, 401));
      }
      const userToken = createUserToken(user);
      delete user.password;
      //send response
      sendResponse(res, {
        statusCode: httpStatusCodes.OK,
        success: true,
        message: 'You have successfully logged in.',
        data: {
          accessToken: userToken.accessToken,
          user,
        },
      });
    })(req, res, next);
  }
);

const googleCallback = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new AppError('User not found', httpStatusCodes.NOT_FOUND);
    }
    const tokenInfo = createUserToken(user);
    setCookies(res, tokenInfo);
    let redirectTo = req.query.state ? (req.query.state as string) : '';
    if (redirectTo.startsWith('/')) {
      redirectTo = redirectTo.slice(1);
    }
    res.redirect(`${ENV.CLIENT_URL}/${redirectTo}`);
  }
);

const verifyUser = createAsyncFn(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'User logged in',
    data: req.user,
  });
});

const logout = createAsyncFn(async (req: Request, res: Response) => {
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
});

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

const changePassword = async (req: Request, res: Response) => {
  const { oldPass, newPass } = req.body;
  console.log(oldPass,newPass)
  const decodedToken = req.user;
  await authService.changePassword(oldPass, newPass, decodedToken as IJwt);
  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: 'Password Chanange Successfully.',
    data: null,
  });
};

export const authController = {
  login,
  verifyUser,
  logout,
  forgetPassword,
  resetPassword,
  googleCallback,
  changePassword,
};

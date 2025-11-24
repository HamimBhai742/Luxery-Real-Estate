import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { authService } from './auth.services';
import { createUserToken } from '../../utils/create.jwt';
import { sendResponse } from '../../utils/send.response';
import { setCookies } from '../../utils/set.cookies';

const login = createAsyncFn(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await authService.login({ email, password });
  if (user) {
    const token = await createUserToken(user);

    setCookies(res, token);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: token,
    });
  }
});

export const authController = {
  login,
};

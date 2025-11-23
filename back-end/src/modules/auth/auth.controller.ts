import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { authService } from './auth.services';
import { createUserToken } from '../../utils/create.jwt';

const login = createAsyncFn(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await authService.login({ email, password });
  if (user) {
    await createUserToken(user);
  }
});

export const authController = {
  login,
};

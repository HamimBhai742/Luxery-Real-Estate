import { Response } from 'express';
import { ENV } from '../config/env';

interface IToken {
  accessToken?: string;
}
export const setCookies = (res: Response, token: IToken) => {
  if (token?.accessToken) {
    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      // domain:'.luxery-real-estate-742.vercel.app'
    });
  }
};

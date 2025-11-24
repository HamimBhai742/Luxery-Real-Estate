import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { userService } from './user.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
const registerUser = createAsyncFn(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
    message: 'User created successfully',
    data: user,
  });
});

const getMe = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    const email = req?.user?.email;
    const user = await userService.getMe(email as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: 'User fetched successfully',
      data: user,
    });
  }
);

export const userController = {
  registerUser,
  getMe,
};

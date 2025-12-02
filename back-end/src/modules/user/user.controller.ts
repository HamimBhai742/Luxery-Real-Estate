import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { userService } from './user.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
import { pickQuery } from '../../utils/pick.query';
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
    console.log(req.user);
    const user = await userService.getMe(email as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: 'User Retrived Successfully',
      data: user,
    });
  }
);

const getAllUsers = createAsyncFn(async (req: Request, res: Response) => {
  console.log(req.query)
  const options = pickQuery(req.query, [
    'limit',
    'page',
    'search',
    'sortBy',
    'sortOrder',
  ]);

  const filters = pickQuery(req.query, ['email', 'phone', 'status']);
  const users = await userService.getAllUsers(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Users Retrived Successfully',
    data: users,
  });
});

export const userController = {
  registerUser,
  getMe,
  getAllUsers,
};

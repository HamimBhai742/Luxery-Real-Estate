import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import { statsServices } from './stats.services';
import { IJwt } from '../../types/user.interface';

const getAdminStats = createAsyncFn(async (req: Request, res: Response) => {
  const stats = await statsServices.getAdminStats();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Stats fetched successfully',
    data: stats,
  });
});

const getUserStats = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    const stats = await statsServices.getUserStats(Number(req?.user?.userId));
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Stats fetched successfully',
      data: stats,
    });
  }
);

export const statsController = {
  getAdminStats,
  getUserStats,
};

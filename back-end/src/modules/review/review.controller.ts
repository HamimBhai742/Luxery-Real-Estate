import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { reviewServices } from './review.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
import { pickQuery } from '../../utils/pick.query';

const createReview = createAsyncFn(async (req: Request, res: Response) => {
  const payload = req.body;
  const { userId } = req.user as IJwt;
  const review = await reviewServices.createReview(payload, Number(userId));
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
    message: 'Review created successfully',
    data: review,
  });
});

const getAllReviews = createAsyncFn(async (req: Request, res: Response) => {
  const options = pickQuery(req.query, [
    'limit',
    'page',
    'search',
    'sortBy',
    'sortOrder',
  ]);
  const filters = pickQuery(req.query, ['status']);
  const reviews = await reviewServices.getAllReviews(options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Reviews Retrived Successfully',
    data: reviews.reviews,
    metaData: reviews.metaData,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
};

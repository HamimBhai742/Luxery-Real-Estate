import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { blogServices } from './blog.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
const createBlog = createAsyncFn(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    image: req.file?.path,
  };
  const blog = await blogServices.createBlog(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
    message: 'Blog created successfully',
    data: blog,
  });
});

export const blogController = {
  createBlog,
};

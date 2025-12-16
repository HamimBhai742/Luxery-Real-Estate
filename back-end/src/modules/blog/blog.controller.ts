import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { blogServices } from './blog.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { pickQuery } from '../../utils/pick.query';
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

const getAllBlogs = createAsyncFn(async (req: Request, res: Response) => {
  const options = pickQuery(req.query, [
    'limit',
    'page',
    'search',
    'sortBy',
    'sortOrder',
  ]);

  const filters = pickQuery(req.query, ['category']);
  const blogs = await blogServices.getAllBlogs(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Blogs Retrived Successfully',
    data: blogs.blog,
    metaData: blogs.metaData,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
};

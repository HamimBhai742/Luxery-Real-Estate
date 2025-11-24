import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import { propertyServices } from './property.services';

const createProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.createProperty(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Property created successfully',
    data: property,
  });
});

export const propertyController = {
  createProperty,
};

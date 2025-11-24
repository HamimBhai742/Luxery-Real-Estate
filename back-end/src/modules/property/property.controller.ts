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

const getMyProperties = createAsyncFn(async (req: Request, res: Response) => {
  const properties = await propertyServices.getMyProperty();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Properties Retrived Successfully',
    data: properties,
  });
});

const updateProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.updateProperty(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Property updated successfully',
    data: property,
  });
});

const deleteProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.deleteProperty(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Property deleted successfully',
    data: property,
  });
});

export const propertyController = {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
};

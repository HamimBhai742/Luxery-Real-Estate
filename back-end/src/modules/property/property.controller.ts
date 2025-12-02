import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import { propertyServices } from './property.services';
import { pickQuery } from '../../utils/pick.query';

const createProperty = createAsyncFn(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    images: (req.files as Express.Multer.File[])?.map((file) => file.path),
  };
  const property = await propertyServices.createProperty(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Property created successfully',
    data: property,
  });
});

const getMyProperties = createAsyncFn(async (req: Request, res: Response) => {
  const options = pickQuery(req.query, [
    'limit',
    'page',
    'search',
    'sortBy',
    'sortOrder',
  ]);

  const filters = pickQuery(req.query, [ 'status']);
  const properties = await propertyServices.getMyProperty(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Properties Retrived Successfully',
    data: properties,
  });
});

const getAllProperties = createAsyncFn(async (req: Request, res: Response) => {
  const properties = await propertyServices.getAllProperties();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Properties Retrived Successfully',
    data: properties,
  });
});

const getSingleProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.getSingleProperty(req.params.slug);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Property Retrived Successfully',
    data: property,
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
  getAllProperties,
  getSingleProperty,
};

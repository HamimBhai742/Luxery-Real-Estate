import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import { propertyServices } from './property.services';
import { pickQuery } from '../../utils/pick.query';
import httpStatusCodes from 'http-status-codes';
const createProperty = createAsyncFn(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    images: (req.files as Express.Multer.File[])?.map((file) => file.path),
  };
  const property = await propertyServices.createProperty(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
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

  const filters = pickQuery(req.query, ['status']);
  const properties = await propertyServices.getMyProperty(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Properties Retrived Successfully',
    data: properties,
  });
});

const getAllProperties = createAsyncFn(async (req: Request, res: Response) => {
  const options = pickQuery(req.query, [
    'limit',
    'page',
    'search',
    'sortBy',
    'sortOrder',
    'prices',
    'bedrooms',
  ]);

  const filters = pickQuery(req.query, ['status', 'price', 'bedrooms']);
  const properties = await propertyServices.getAllProperties(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Properties Retrived Successfully',
    data: properties,
  });
});

const getSingleProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.getSingleProperty(req.params.slug);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
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
    statusCode: httpStatusCodes.OK,
    message: 'Property updated successfully',
    data: property,
  });
});

const deleteProperty = createAsyncFn(async (req: Request, res: Response) => {
  const property = await propertyServices.deleteProperty(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Property deleted successfully',
    data: property,
  });
});

const findSingleProperty = createAsyncFn(
  async (req: Request, res: Response) => {
    const property = await propertyServices.findSingleProperty(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.ACCEPTED,
      message: 'Property Retrived Successfully',
      data: property,
    });
  }
);

export const propertyController = {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
  findSingleProperty,
};

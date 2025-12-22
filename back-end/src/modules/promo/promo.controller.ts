import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { promoServices } from './promo.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { IJwt } from '../../types/user.interface';
const createPromo = createAsyncFn(async (req: Request, res: Response) => {
  const payload = req.body;
  const promo = await promoServices.createPromo(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
    message: 'Promo created successfully',
    data: promo,
  });
});

const usePromo = createAsyncFn(async (req: Request, res: Response) => {
  const { code, bookingId } = req.body;
  const { userId } = req.user as IJwt;
  console.log(code, bookingId, userId);
  const promos = await promoServices.usePromo(
    code.toUpperCase(),
    bookingId,
    Number(userId)
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Promo used successfully',
    data: promos,
  });
});

const createUsePromo = createAsyncFn(async (req: Request, res: Response) => {
  const { code } = req.body;
  const { userId } = req.user as IJwt;
  const promos = await promoServices.createUsePromo(
    code.toUpperCase(),
    Number(userId)
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Promo used successfully',
    data: promos,
  });
});

const getAllPromo = createAsyncFn(async (req: Request, res: Response) => {
  const promos = await promoServices.getAllPromos();
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Promo used successfully',
    data: promos,
  });
});

const updatePromo = createAsyncFn(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const promos = await promoServices.updatePromo(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Promo updated successfully',
    data: promos,
  });
});

const deletePromo = createAsyncFn(async (req: Request, res: Response) => {
  const { id } = req.params;
  const promos = await promoServices.deletePromo(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.OK,
    message: 'Promo deleted successfully',
    data: promos,
  });
});

export const promoController = {
  createPromo,
  usePromo,
  createUsePromo,
  getAllPromo,
  updatePromo,
  deletePromo,
};

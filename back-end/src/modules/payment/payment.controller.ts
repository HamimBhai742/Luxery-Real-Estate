import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { paymentServices } from './payment.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCodes from 'http-status-codes';
import { ENV } from '../../config/env';

const createPayment = createAsyncFn(async (req: Request, res: Response) => {
  const payment = await paymentServices.initPayment(req.body.bookingId as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCodes.CREATED,
    message: 'Payment Initiated Successfully',
    data: payment,
  });
});

//success payment
const successPayment = createAsyncFn(async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  const payment = await paymentServices.successPayment(query as Record<string, string>);

  if (payment.success) {
    res.redirect(
      `${ENV.SSL_SUCCESS_FRONT_END_URL}?transactionId=${query.transactionId}&message=${payment.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

export const paymentController = {
  createPayment,
  successPayment,
};

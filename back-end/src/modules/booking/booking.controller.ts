import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { bookingServices } from './booking.services';
import { sendResponse } from '../../utils/send.response';
import { IJwt } from '../../types/user.interface';

const createBooking = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    const userId = req?.user?.userId as string;
    const propertyId = req?.body?.propertyId as string;
    const booking = await bookingServices.createBooking(userId, propertyId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Booking created successfully',
      data: booking,
    });
  }
);

export const bookingController = {
  createBooking,
};

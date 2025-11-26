import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { bookingServices } from './booking.services';
import { sendResponse } from '../../utils/send.response';
import { IJwt } from '../../types/user.interface';

const createBooking = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    const userId = Number(req?.user?.userId) as number;
    console.log(req.user)
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

const getMyBookings = createAsyncFn(
  async (req: Request & { user?: IJwt }, res: Response) => {
    const userId = Number(req?.user?.userId) as number;
    console.log('first')
    const bookings = await bookingServices.getMyBookings(userId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Bookings fetched successfully',
      data: bookings,
    });
  }
);

export const bookingController = {
  createBooking,
  getMyBookings,
};

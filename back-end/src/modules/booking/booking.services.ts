import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.config';
import crypto from 'crypto';
import { AppError } from '../../error/coustom.error';

const tranx = (): string => {
  const id = crypto.randomBytes(5).toString('hex').substring(0, 10);
  return `tran_${id}`;
};

const createBooking = async (userId: string, propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (property?.isBooked) {
    throw new AppError(
      'Property is already booked',
      httpStatusCode.NOT_ACCEPTABLE
    );
  }
  return await prisma.$transaction(async (tx) => {
    const data = {
      userId: Number(userId),
      propertyId,
      totalAmount: property?.price as number,
    };
    console.log(data);
    const booking = await tx.booking.create({ data });
    await tx.property.update({
      where: { id: propertyId },
      data: {
        isBooked: true,
      },
    });
    await tx.payment.create({
      data: {
        bookingId: booking.id,
        transactionId: tranx(),
      },
    });
    return booking;
  });
};

export const bookingServices = {
  createBooking,
};

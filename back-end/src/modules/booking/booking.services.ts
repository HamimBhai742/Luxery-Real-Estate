import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.configs';
import crypto from 'crypto';
import { AppError } from '../../error/coustom.error';

const tranx = (): string => {
  const id = crypto.randomBytes(5).toString('hex').substring(0, 10);
  return `tran_${id}`;
};

const createBooking = async (userId: number, propertyId: string) => {
  console.log(userId, propertyId);
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
        status: 'booked',
      },
    });
    await tx.payment.create({
      data: {
        bookingId: booking.id,
        transactionId: tranx(),
        userId,
        amount: property?.price as number,
      },
    });
    return booking;
  });
};

const getMyBookings = async (userId: number) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      property: true,
    },
  });
};

export const bookingServices = {
  createBooking,
  getMyBookings,
};

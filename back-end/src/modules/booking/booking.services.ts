import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.configs';
import crypto from 'crypto';
import { AppError } from '../../error/coustom.error';
import { pagination } from '../../utils/pagination';
import { bookingSearchFiled } from './booking.constain';

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

const getMyBookings = async (userId: number, filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = bookingSearchFiled.map((field) => ({
    property: {
      [field]: {
        contains: search,
        mode: 'insensitive',
      },
    },
  }));
  const where: any = {
    AND: [
      { userId },
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };
  const bookings = await prisma.booking.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      property: true,
    },
  });

  const total = await prisma.booking.count({
    where,
  });

  const pendingBookings = await prisma.booking.count({
    where: {
      userId,
      status: 'pending',
    },
  });

  const confirmedBookings = await prisma.booking.count({
    where: {
      userId,
      status: 'paid',
    },
  });

  const cancelledBookings = await prisma.booking.count({
    where: {
      userId,
      status: 'canceled',
    },
  });
  return {
    bookings,
    metaData: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
    },
  };
};

export const bookingServices = {
  createBooking,
  getMyBookings,
};

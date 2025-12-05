import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { BookingStatus, PaymentStatus } from '@prisma/client';
import { sslCommerzServices } from '../sslcommerz/sslcommerz.services';
import { paymentSearchFiled } from './payment.constain';
import { pagination } from '../../utils/pagination';
import { sendEmail } from '../../utils/send.email';
import { ENV } from '../../config/env';

const initPayment = async (bookingId: string) => {
  console.log(bookingId);
  const payment = await prisma.payment.findUnique({ where: { bookingId } });
  console.log(payment);
  if (!payment) {
    throw new AppError('Payment Not Found', httpStatusCode.NOT_FOUND);
  }

  if (payment.status === PaymentStatus.succeeded) {
    throw new AppError(
      'Payment already paid & booking complete',
      httpStatusCode.NOT_FOUND
    );
  }
  if (payment.status === PaymentStatus.failed) {
    throw new AppError('Payment failed', httpStatusCode.NOT_FOUND);
  }
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  const user = await prisma.user.findUnique({ where: { id: booking?.userId } });

  const sslPayload: any = {
    name: user?.name,
    amount: booking?.totalAmount,
    phone: user?.phone,
    email: user?.email,
    transactionId: payment.transactionId,
  };

  const sslPayment = await sslCommerzServices.paymentInit(sslPayload);
  console.log(sslPayment);
  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};

//success Payment
const successPayment = async (query: Record<string, string>) => {
  return await prisma.$transaction(async (tx) => {
    const updatePayment = await tx.payment.update({
      where: { transactionId: query.transactionId },
      data: {
        status: PaymentStatus.succeeded,
      },
    });

    const user = await tx.user.findUnique({
      where: { id: updatePayment.userId },
    });

    const booking = await tx.booking.update({
      where: { id: updatePayment.bookingId },
      data: {
        status: BookingStatus.paid,
      },
    });

    await tx.property.update({
      where: { id: booking.propertyId },
      data: {
        isBooked: true,
        status: 'sold',
      },
    });

    sendEmail({
      to: user!.email,
      subject: 'Payment Successful',
      templateName: 'paymentSuccess',
      templateData: {
        name: user!.name,
        transactionId: updatePayment.transactionId,
        amount: updatePayment.amount,
        paymentDate: updatePayment.createdAt.toISOString().split('T')[0],
        appName: ENV.APP_NAME,
      },
    });
    return {
      success: true,
      message: 'Payment Success & Booking Success',
    };
  });
};

//failed Payment
const failedPayment = async (query: Record<string, string>) => {
  return await prisma.$transaction(async (tx) => {
    const updatePayment = await tx.payment.update({
      where: { transactionId: query.transactionId },
      data: {
        status: PaymentStatus.failed,
      },
    });
    const booking = await tx.booking.update({
      where: { id: updatePayment.bookingId },
      data: {
        status: 'canceled',
      },
    });

    await tx.property.update({
      where: { id: booking.propertyId },
      data: {
        isBooked: false,
        status: 'available',
      },
    });
    return {
      failed: true,
      message: 'Payment Failed & Booking Failed',
    };
  });
};

//cancel Payment
const cancelPayment = async (query: Record<string, string>) => {
  return await prisma.$transaction(async (tx) => {
    const updatePayment = await tx.payment.update({
      where: { transactionId: query.transactionId },
      data: {
        status: PaymentStatus.canceled,
      },
    });
    const booking = await tx.booking.update({
      where: { id: updatePayment.bookingId },
      data: {
        status: BookingStatus.canceled,
      },
    });

    await tx.property.update({
      where: { id: booking.propertyId },
      data: {
        isBooked: false,
        status: 'available',
      },
    });

    
    return {
      canceled: true,
      message: 'Payment Canceled & Booking Canceled',
    };
  });
};

const getAllPayments = async () => {
  const payments = await prisma.payment.findMany();
  return payments;
};

const getMyPayments = async (userId: number, filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = paymentSearchFiled.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));
  const where: any = {
    AND: [
      { userId },
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };
  const payments = await prisma.payment.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const totalAmount = await prisma.payment.aggregate({
    where,
    _sum: {
      amount: true,
    },
  });

  const total = await prisma.payment.count({
    where,
  });

  const totalSuccess = await prisma.payment.count({
    where: {
      status: PaymentStatus.succeeded,
    },
  });

  const totalFailed = await prisma.payment.count({
    where: {
      status: PaymentStatus.failed,
    },
  });

  const totalCanceled = await prisma.payment.count({
    where: {
      status: PaymentStatus.canceled,
    },
  });

  const totalPending = await prisma.payment.count({
    where: {
      status: PaymentStatus.pending,
    },
  });

  return {
    payments,
    metaData: {
      total,
      totalSuccess,
      totalFailed,
      totalCanceled,
      totalAmount: totalAmount._sum.amount,
      totalPending,
      totalPages: Math.ceil(total / limit),
    },
  };
  return payments;
};

export const paymentServices = {
  successPayment,
  failedPayment,
  cancelPayment,
  getAllPayments,
  initPayment,
  getMyPayments,
};

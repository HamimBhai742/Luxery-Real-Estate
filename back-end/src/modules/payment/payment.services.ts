import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { BookingStatus, PaymentStatus } from '@prisma/client';
import { sslCommerzServices } from '../sslcommerz/sslcommerz.services';

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

    await tx.booking.update({
      where: { id: updatePayment.bookingId },
      data: {
        status: BookingStatus.paid,
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
        status: BookingStatus.canceled,
      },
    });

    await tx.property.update({
      where: { id: booking.propertyId },
      data: {
        isBooked: false,
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

export const paymentServices = {
  successPayment,
  failedPayment,
  cancelPayment,
  getAllPayments,
  initPayment,
};

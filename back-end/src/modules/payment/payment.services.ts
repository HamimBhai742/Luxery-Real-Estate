import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustom.error';
import { PaymentStatus } from '@prisma/client';
import { sslCommerzServices } from '../sslcommerz/sslcommerz.services';

const initPayment = async (bookingId: string) => {
  const payment = await prisma.payment.findUnique({ where: { bookingId } });
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
  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};

//success Payment
const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.PAID,
      },
      { new: true, runValidators: true, session }
    );

    if (!updatePayment) {
      throw new AppError('Payment not found', httpStatusCode.NOT_FOUND);
    }
    const updateBooking = await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.COMPLETE,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    )
      .populate('user', 'name email')
      .populate('tour', 'title');

    if (!updateBooking) {
      throw new AppError('Booking not found', httpStatusCode.NOT_FOUND);
    }

    const bookingDate = format(
      new Date(updateBooking.createdAt as Date),
      'dd/MM/yy hh:mm:ss a'
    );

    const invoiceData: Invoice = {
      transactionId: updatePayment.transactionId,
      bookingDate: bookingDate,
      userName: (updateBooking.user as unknown as IUser).name,
      tourTitle: (updateBooking.tour as unknown as ITour).title,
      guestCount: updateBooking.geustCount,
      totalAmount: updatePayment.amount,
    };
    await session.commitTransaction();
    session.endSession();

    // const buffer = await generateInvoice(invoiceData);
    // const inoiceUrl = await uploadBufferToCloudinary(buffer, 'invoice');

    // if (!inoiceUrl) {
    //   throw new AppError('Invoice not uploaded', httpStatusCode.NOT_FOUND);
    // }

    // await Payment.findByIdAndUpdate(
    //   { _id: updatePayment._id },
    //   {
    //     invoiceUrl: inoiceUrl.secure_url,
    //   },
    //   { new: true, runValidators: true, session }
    // );

    await sendEmail({
      to: (updateBooking.user as unknown as IUser).email,
      subject: 'Tour Booking Invoice',
      templateName: 'invoice',
      templateData: invoiceData,
    });

    // attachments: [
    //   {
    //     filename: 'invoice.pdf',
    //     content: buffer,
    //     contentType: 'application/pdf',
    //   },
    // ],
    return {
      success: true,
      message: 'Payment Success & Booking Comfrimed',
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

//failed Payment
const failedPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.FAILED,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.FAILED,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      fail: true,
      message: 'Payment Failed & Booking Failed',
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

//cancel Payment
const cancelPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.CANCEL,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findOneAndUpdate(
      updatePayment?.booking,
      {
        status: BOOKING_STATUS.CANCEL,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      cancel: true,
      message: 'Payment Cancel & Booking Cancel',
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllPayments = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Payment.find(), query);
  const paymentCount = await Payment.countDocuments();
  const payments = await queryBuilder.build();
  const metaData = await queryBuilder.getMeta(paymentCount);
  return { payments, metaData };
};

const getInvoiceDownloadUrl = async (id: string, userId: any) => {
  const payment = await Payment.findById(id).select('invoiceUrl booking');
  if (!payment?.invoiceUrl) {
    throw new AppError('Invoice not found', httpStatusCode.NOT_FOUND);
  }
  const fiUserId = await Booking.findById(payment.booking).select('user');
  if (!fiUserId?.user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }
  if (userId !== fiUserId.user.toString()) {
    throw new AppError('This is not your invoice', httpStatusCode.BAD_REQUEST);
  }

  return payment.invoiceUrl;
};

const updatePayment = async (id: string, payload: Partial<IPayment>) => {
  const isExsist = await Payment.findById(id);
  if (!isExsist) {
    throw new AppError('Payment not found', httpStatusCode.NOT_FOUND);
  }
  const update = await Payment.findByIdAndUpdate(id, payload);
  return update;
};

const deletePayment = async (id: string) => {
  const isExsist = await Payment.findById(id);
  if (!isExsist) {
    throw new AppError('Payment not found', httpStatusCode.NOT_FOUND);
  }
  await Payment.findByIdAndDelete(id);
  return null;
};

export const paymentServices = {
  successPayment,
  failedPayment,
  cancelPayment,
  getAllPayments,
  getInvoiceDownloadUrl,
  updatePayment,
  deletePayment,
  initPayment,
};

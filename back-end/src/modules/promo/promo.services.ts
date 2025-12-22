import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { IPromo } from './promo.schema';
import httpStatusCodes from 'http-status-codes';

const createPromo = async (data: IPromo) => {
  const promoCode = data.code.toUpperCase();
  const discount = Number(data.discount);
  const validFrom = new Date(data.validFrom);
  const validTo = new Date(data.validTo);
  const payload = {
    code: promoCode,
    discount,
    validFrom,
    validTo,
  };
  const promos = await prisma.promo.create({ data: payload });
  return promos;
};

const usePromo = async (code: string, bookingId: string, userId: number) => {
  const promos = await prisma.promo.findUnique({ where: { code } });
  if (!promos) {
    throw new AppError('Invalid Promo', httpStatusCodes.NOT_FOUND);
  }
  //is deleted
  if (promos.isDeleted) {
    throw new AppError('Promo is deleted', httpStatusCodes.NOT_FOUND);
  }
  //is expired
  const currentDate = new Date();
  if (promos.validTo < currentDate) {
    throw new AppError('Promo Expired', httpStatusCodes.NOT_FOUND);
  }
  const promosUsages = await prisma.promoUsage.findUnique({
    where: { promoId_userId: { promoId: promos.id, userId } },
  });

  if (promosUsages) {
    throw new AppError('Promo already used', httpStatusCodes.NOT_FOUND);
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { property: true },
  });
  if (!booking) {
    throw new AppError('Booking not found', httpStatusCodes.NOT_FOUND);
  }

  const discountAmount =
    (Number(booking.property.price) * Number(promos.discount)) / 100;

  const totalAmount = Number(booking.property.price) - discountAmount;

  await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        totalAmount,
      },
    });

    await tx.payment.update({
      where: { bookingId: booking.id },
      data: {
        amount: totalAmount,
      },
    });
  });

  return { totalAmount, discountAmount, discount: promos.discount };
};

const createUsePromo = async (code: string, userId: number) => {
  const promos = await prisma.promo.findUnique({ where: { code } });
  if (!promos) {
    throw new AppError('Invalid Promo', httpStatusCodes.NOT_FOUND);
  }
  return await prisma.promoUsage.create({
    data: {
      promoId: promos.id,
      userId,
    },
  });
};

const updatePromo = async (id: string, payload: any) => {
  const promoCode = payload.code.toUpperCase();
  const discount = Number(payload.discount);
  const validFrom = new Date(payload.validFrom);
  const validTo = new Date(payload.validTo);
  const promos = await prisma.promo.update({
    where: { id },
    data: {
      code: promoCode,
      discount,
      validFrom,
      validTo,
    },
  });
  return promos;
};

const deletePromo = async (id: string) => {
  const promos = await prisma.promo.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
  return promos;
};

const getAllPromos = async () => {
  return await prisma.promo.findMany();
};

export const promoServices = {
  createPromo,
  usePromo,
  createUsePromo,
  getAllPromos,
  updatePromo,
  deletePromo,
};

import { prisma } from '../../config/prisma.configs';
import { pagination } from '../../utils/pagination';

const createReview = async (payload: any, userId: number) => {
  const data = {
    ...payload,
    userId,
  };
  return prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: payload.bookingId },
      data: {
        isReviewed: true,
      },
    });
    return await tx.review.create({ data });
  });
};

const getAllReviews = async (options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const reviews = await prisma.review.findMany({
    include: {
      booking: {
        include: {
          property: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
          profile: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return {
    reviews,
    metaData: {
      page,
      limit,
      total: await prisma.review.count(),
      totalPages: Math.ceil((await prisma.review.count()) / limit),
    },
  };
};

export const reviewServices = {
  createReview,
  getAllReviews,
};

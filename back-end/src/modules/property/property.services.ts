import { Prisma } from '@prisma/client';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import { pagination } from '../../utils/pagination';
import { propertiesSearchField } from './properties.constain';
const createProperty = async (payload: Prisma.PropertyCreateInput) => {
  const slug = await generateUniqueSlug(payload.name);
  payload.slug = slug;

  const property = await prisma.property.create({ data: payload });
  return property;
};
const getMyProperty = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = propertiesSearchField.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));
  const where: any = {
    AND: [
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };
  const properties = await prisma.property.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.property.count({
    where,
  });

  const availableProperties = await prisma.property.count({
    where: {
      isBooked: false,
      status: 'available',
    },
  });

  const totalValue = await prisma.property.aggregate({
    _sum: {
      price: true,
    },
  });

  const totalviews = await prisma.property.aggregate({
    _sum: {
      views: true,
    },
  });
  return {
    properties,
    metaData: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalProperties: availableProperties,
      totalValue: totalValue._sum.price,
      totalViews: totalviews._sum.views,
    },
  };
};

const getAllProperties = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search, prices, bedrooms } = options;
  if (prices === 'under2k') {
    filters.price = {
      lte: 2000,
    };
  } else if (prices === '2kto5k') {
    filters.price = {
      gte: 2000,
      lte: 5000,
    };
  } else if (prices === '5kto10k') {
    filters.price = {
      gte: 5000,
      lte: 10000,
    };
  } else if (prices === 'over10k') {
    filters.price = {
      gte: 10000,
    };
  }

  if (bedrooms == 3) {
    filters.bedrooms = {
      gte: 3,
    };
  } else if (bedrooms == 4) {
    filters.bedrooms = {
      gte: 4,
    };
  } else if (bedrooms == 5) {
    filters.bedrooms = {
      gte: 5,
    };
  } else if (bedrooms == 6) {
    filters.bedrooms = {
      gte: 6,
    };
  }

  const searchTerm = propertiesSearchField.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));
  const where: any = {
    AND: [
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };
  const properties = await prisma.property.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.property.count({
    where,
  });

  return {
    properties,
    metaData: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateProperty = async (
  id: string,
  payload: Prisma.PropertyUpdateInput
) => {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) {
    throw new AppError('Property not found', httpStatusCode.NOT_FOUND);
  }
  if (payload.name) {
    const slug = await generateUniqueSlug(payload.name as string);
    payload.slug = slug;
  }
  const updatedProperty = await prisma.property.update({
    where: { id },
    data: payload,
  });
  return updatedProperty;
};

const getSingleProperty = async (slug: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.property.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return await tx.property.findUnique({ where: { slug } });
  });
};
const deleteProperty = async (id: string) => {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) {
    throw new AppError('Property not found', httpStatusCode.NOT_FOUND);
  }
  const deletedProperty = await prisma.property.delete({ where: { id } });
  return deletedProperty;
};

export const propertyServices = {
  createProperty,
  getMyProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
};

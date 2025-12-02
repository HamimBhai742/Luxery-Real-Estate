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
  console.log(filters, options);
  const searchTerm = propertiesSearchField.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));
console.log(searchTerm)
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
  return properties;
};

const getAllProperties = async () => {
  const properties = await prisma.property.findMany();
  return properties;
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

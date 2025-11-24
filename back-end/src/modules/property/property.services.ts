import { Prisma } from '@prisma/client';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
const createProperty = async (payload: Prisma.PropertyCreateInput) => {
  const slug = await generateUniqueSlug(payload.name);
  payload.slug = slug;

  const property = await prisma.property.create({ data: payload });
  return property;
};
const getMyProperty = async () => {
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
const deleteProperty = async () => {};

export const propertyServices = {
  createProperty,
  getMyProperty,
  updateProperty,
  deleteProperty,
};

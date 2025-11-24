import { Prisma } from '@prisma/client';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';
import { prisma } from '../../config/prisma.config';

const createProperty = async (payload: Prisma.PropertyCreateInput) => {
  const slug = await generateUniqueSlug(payload.name);
  payload.slug = slug;

  const property = await prisma.property.create({ data: payload });
  return property;
};
const getProperty = async () => {};
const updateProperty = async () => {};
const deleteProperty = async () => {};

export const propertyServices = {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
};

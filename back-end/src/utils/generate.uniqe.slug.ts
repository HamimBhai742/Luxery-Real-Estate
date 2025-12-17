import { prisma } from '../config/prisma.configs';

export const generateUniqueSlug = async (title: string) => {
  const baseSlug: string = title.toLowerCase().trim().split(' ').join('-');
  let counter = 0;
  let slug = baseSlug;
  while (
    (await prisma.property.findUnique({ where: { slug } })) ||
    (await prisma.blog.findUnique({ where: { slug } }))
  ) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
};

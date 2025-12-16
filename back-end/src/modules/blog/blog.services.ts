import { prisma } from '../../config/prisma.configs';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';

const createBlog = async (payload: any) => {
  console.log(payload);
  const slug =await generateUniqueSlug(payload.title);
  payload.slug = slug;
  console.log(slug);
  console.log(payload);
  const blog = await prisma.blog.create({ data: payload });
  return blog;
};

export const blogServices = {
  createBlog,
};

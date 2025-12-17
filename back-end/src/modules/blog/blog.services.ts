import { prisma } from '../../config/prisma.configs';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';
import { pagination } from '../../utils/pagination';
import { blogSearchField } from './blog.constain';

const createBlog = async (payload: any) => {
  const slug = await generateUniqueSlug(payload.title);
  payload.slug = slug;
  const blog = await prisma.blog.create({ data: payload });
  return blog;
};

const getAllBlogs = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = blogSearchField.map((field) => ({
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
  const blog = await prisma.blog.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.blog.count({
    where,
  });

  return {
    blog,
    metaData: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleBlog = async (slug: string) => {
  const blog = await prisma.blog.findUnique({ where: { slug } });
  return blog;
};

const getMyBlogs = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = blogSearchField.map((field) => ({
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
  const blog = await prisma.blog.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.blog.count({
    where,
  });

  return {
    blog,
    metaData: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
};

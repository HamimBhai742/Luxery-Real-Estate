import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { generateUniqueSlug } from '../../utils/generate.uniqe.slug';
import { pagination } from '../../utils/pagination';
import { blogSearchField } from './blog.constain';
import httpStatusCodes from 'http-status-codes';
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

const updateBlog = async (id: string, payload: any) => {
  const findBlog = await prisma.blog.findUnique({ where: { id } });
  if (!findBlog) {
    throw new AppError('Blog not found', httpStatusCodes.NOT_FOUND);
  }
  if (payload.title) {
    const slug = await generateUniqueSlug(payload.title as string);
    payload.slug = slug;
  }
  const blog = await prisma.blog.update({ where: { id }, data: payload });
  return blog;
};

const deleteBlog = async (id: string) => {
  const blog = await prisma.blog.delete({ where: { id } });
  return blog;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
};

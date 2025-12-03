import { ENV } from '../../config/env';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { IUser } from '../../types/user.interface';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { pagination } from '../../utils/pagination';
import { userSearchFileds } from './user.contain';
const registerUser = async (payload: IUser) => {
  const { password, ...rest } = payload;
  const hashedPass = await bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPass,
    },
  });

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const getMe = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id,
  };
};

const getAllUsers = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  console.log(filters, options);
  const searchTerm = userSearchFileds.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));

  const where: any = {
    AND: [
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
      {
        isDeleted: false,
        role: 'USER',
      },
    ].filter(Boolean),
  };
  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where,
  });

  const totalActive = await prisma.user.count({
    where: {
      status: 'active',
      role: 'USER',
    },
  });

  const totalInactive = await prisma.user.count({
    where: {
      status: 'inactive',
      role: 'USER',
    },
  });
  return {
    data: users,
    metaData: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalActive,
      totalInactive,
    },
  };
};

const updateUser = async (id: number, status: 'active' | 'inactive') => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      status,
    },
  });
  return user;
};

export const userService = {
  registerUser,
  getMe,
  getAllUsers,
  updateUser,
};

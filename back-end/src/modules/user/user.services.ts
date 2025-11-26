import { ENV } from '../../config/env';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import { IUser } from '../../types/user.interface';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
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

export const userService = {
  registerUser,
  getMe,
};

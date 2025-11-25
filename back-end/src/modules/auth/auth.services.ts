import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcrypt';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    throw new AppError('Invalid password', httpStatusCode.UNAUTHORIZED);
  }

  return user;
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
  };
};

export const authService = {
  login,
  getMe,
};

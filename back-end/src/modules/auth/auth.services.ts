import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';

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

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id,
  };
};



export const authService = {
  login,

};

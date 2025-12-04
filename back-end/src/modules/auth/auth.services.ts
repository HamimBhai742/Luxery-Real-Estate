import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Status } from '@prisma/client';
import { createJwtToken } from '../../utils/create.token';
import { ENV } from '../../config/env';
import { sendEmail } from '../../utils/send.email';

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

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  if (user.status === Status.inactive) {
    throw new AppError(`User is ${user.status}`, httpStatusCode.NOT_ACCEPTABLE);
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = createJwtToken(
    jwtPayload,
    ENV.JWT_SECRET,
    ENV.RESET_TOKEN_EXPIRE_IN
  );
  const resetUrl = `${ENV.CLIENT_URL}/reset-password?token=${token}&id=${user.id}`;
  sendEmail({
    to: user.email,
    subject: 'Reset Password',
    templateName: 'forgetPassword',
    templateData: {
      name: 'Hamim',
      resetUrl,
    },
  });
};

export const authService = {
  login,
  forgetPassword,
};

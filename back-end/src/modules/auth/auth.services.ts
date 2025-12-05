import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Status } from '@prisma/client';
import { createJwtToken, verifyJwtToken } from '../../utils/create.token';
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
    ENV.RESET_JWT_SECRET,
    ENV.RESET_TOKEN_EXPIRE_IN
  );
  const resetUrl = `${ENV.CLIENT_URL}/reset-password?token=${token}&id=${user.id}`;
  sendEmail({
    to: user.email,
    subject: 'Reset Password',
    templateName: 'forgetPassword',
    templateData: {
      name: user.name,
      resetUrl,
    },
  });
};

const resetPassword = async (token: string, newPassword: string) => {
  console.log(token, newPassword);
  if (!token) {
    throw new AppError('Token is missing', httpStatusCode.BAD_REQUEST);
  }
  const decode = verifyJwtToken(token, ENV.RESET_JWT_SECRET);

  if (!decode) {
    throw new AppError('Token is invalid', httpStatusCode.BAD_REQUEST);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decode.email,
    },
  });

  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }
  const hashPass = await bcrypt.hash(newPassword, ENV.BCRYPT_SALT_ROUNDS);
  await prisma.user.update({
    where: {
      email: decode.email,
    },
    data: {
      password: hashPass,
    },
  });

  sendEmail({
    to: user.email,
    subject: 'Reset Password Successfully',
    templateName: 'resetPassword',
    templateData: {
      name: user.name,
      appName: 'Luxery Real Estate',
    },
  });
};

export const authService = {
  login,
  forgetPassword,
  resetPassword,
};

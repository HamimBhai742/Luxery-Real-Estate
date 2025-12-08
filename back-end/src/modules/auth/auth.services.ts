import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Status } from '@prisma/client';
import { createJwtToken, verifyJwtToken } from '../../utils/create.token';
import { ENV } from '../../config/env';
import { sendEmail } from '../../utils/send.email';
import { IJwt } from '../../types/user.interface';
import bcryptjs from 'bcryptjs';
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

const changePassword = async (
  oldPass: string,
  newPass: string,
  decoded: IJwt
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: decoded.email,
    },
  });
  const matchPass = await bcryptjs.compare(oldPass, user?.password as string);

  if (!matchPass) {
    throw new AppError(
      "Old password doesn't match",
      httpStatusCode.BAD_REQUEST
    );
  }

  if (newPass === oldPass) {
    throw new AppError(
      "New password can't be same as old password",
      httpStatusCode.BAD_REQUEST
    );
  }
  const hashedPass = await bcryptjs.hash(newPass, ENV.BCRYPT_SALT_ROUNDS);
  await prisma.user.update({
    where: {
      email: decoded.email,
    },
    data: {
      password: hashedPass,
    },
  });
  return true;
};

export const authService = {
  forgetPassword,
  resetPassword,
  changePassword,
};

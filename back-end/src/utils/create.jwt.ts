import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../config/env';
import httpStatusCode from 'http-status-codes';
import { prisma } from '../config/prisma.configs';
import { createJwtToken } from './create.token';

export const createUserToken = (payload: any) => {
  const jsonPayload = {
    userId: payload.id,
    email: payload.email,
    role: payload.role,
  };

  const accessToken = createJwtToken(
    jsonPayload,
    ENV.JWT_SECRET,
    ENV.JWT_EXPIRES_IN
  );

  // const refreshToken = createJwtToken(
  //   jsonPayload,
  //   ENV.REFRESH_TOKEN_SECRET,
  //   ENV.REFRESH_TOKEN_EXPIRES_IN
  // );

  return {
    accessToken,
    // refreshToken,
  };
};

// export const createNewAccessToken = async (refreshToken: string) => {
//   const verifiedToken = verifyJwtToken(
//     refreshToken,
//     ENV.REFRESH_TOKEN_SECRET
//   ) as JwtPayload;
//   const isExsist = await prisma.user.findUnique({
//     where: {
//       email: verifiedToken.email,
//     },
//   });
//   if (!isExsist) {
//     throw new AppError('User does not exsist', httpStatusCode.NOT_FOUND);
//   }

//   if (isExsist.status === 'INACTIVE') {
//     throw new AppError('User is inactive', httpStatusCode.NOT_FOUND);
//   }

//   if (isExsist.status === 'DELETE') {
//     throw new AppError('User is deleted', httpStatusCode.NOT_FOUND);
//   }

//   const userToken = createUserToken(isExsist);
//   return userToken;
// };
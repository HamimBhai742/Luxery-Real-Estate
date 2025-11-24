import { ENV } from '../../config/env';
import { prisma } from '../../config/prisma.config';
import { IUser } from '../../types/user.interface';
import bcrypt from 'bcrypt';
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

export const userService = {
  registerUser,
};

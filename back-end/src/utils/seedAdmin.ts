import { Role } from '@prisma/client';
import { ENV } from '../config/env';
import { prisma } from '../config/prisma.configs';
import bcrypt from 'bcryptjs';
export const seedAdmin = async () => {
  try {
    const email = ENV.ADMIN_EMAIL;
    const admin = await prisma.user.findUnique({ where: { email } });
    if (admin) {
      console.error('Admin already exists');
      return;
    }

    const hashedPass = await bcrypt.hash(
      ENV.ADMIN_PASSWORD,
      ENV.ADMIN_PASS_SALT_ROUNDS
    );
    const payload = {
      name: 'Admin',
      email,
      password: hashedPass,
      role: Role.ADMIN,
    };
    const newAdmin = await prisma.user.create({
      data: payload,
    });
    console.log('Admin created', newAdmin);
  } catch (error) {
    console.log(error);
  }
};

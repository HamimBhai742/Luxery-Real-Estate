import { Auth_Provider, Role } from '@prisma/client';
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
      provider: Auth_Provider.creadintial,
      providerId: email,
      role: Role.ADMIN,
    };
    await prisma.user.create({
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

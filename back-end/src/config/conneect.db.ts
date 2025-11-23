import { prisma } from './prisma.config';

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

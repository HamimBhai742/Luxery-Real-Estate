import { Role } from '@prisma/client';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IJwt {
  userId: string;
  email: string;
  role: Role;
}

import { Auth_Provider, Role } from '@prisma/client';

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profile?: string;
  password: string;
  role: Role;
}

export interface IJwt {
  userId: string;
  email: string;
  role: Role;
}

import { Role } from '@prisma/client';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

import { UserRole } from '../types/user-role.enum';

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
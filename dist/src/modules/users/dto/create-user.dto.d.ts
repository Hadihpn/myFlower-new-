import { UserRole } from '../types/user-role.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
    role?: UserRole;
}

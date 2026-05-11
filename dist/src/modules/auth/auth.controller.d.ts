import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./interfaces/auth-response.interface").AuthRegisterResponse>;
    login(loginDto: LoginDto): Promise<import("./interfaces/auth-response.interface").AuthResponse>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<import("./interfaces/auth-response.interface").AuthResponse>;
    changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}

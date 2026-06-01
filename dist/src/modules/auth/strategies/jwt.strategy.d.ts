import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(req: Request, payload: JwtPayload): Promise<{
        id: any;
        email: any;
        role: any;
        fullName: any;
    }>;
}
export {};

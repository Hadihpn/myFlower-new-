import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Logger } from 'winston';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
      passReqToCallback: true
    });
    console.log('✅ JwtStrategy initialized');
    console.debug(
      `JWT Secret configured: ${configService.get<string>('jwt.secret')?.substring(0, 10)}...`,
    );
  }

  async validate(req: Request, payload: JwtPayload) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 JWT Validation Started');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.debug('📦 Received JWT Payload:');
    console.debug(JSON.stringify(payload, null, 2));
    console.debug(`   - User ID (sub): ${payload.sub}`);
    console.debug(`   - Email: ${payload.email}`);
    console.log(`🔍 Searching for user with ID: ${payload.sub}`);
    console.log(`🔍 Searching for user with ID: ${req}`);

    // const user = await this.userRepository.findOne({
    //   where: { id: payload.sub },
    // });
    let user;
    try {
      user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (user) {
        console.log('✅ User found in database');
        console.debug(`   - ID: ${user.id}`);
        console.debug(`   - Email: ${user.email}`);
        console.debug(`   - Role: ${user.role}`);
        console.debug(`   - Full Name: ${user.fullName}`);
      } else {
        console.error('❌ User NOT found in database');
        console.error(`   - Searched ID: ${payload.sub}`);
        console.error('   - Possible reasons:');
        console.error('     1. User was deleted');
        console.error('     2. Token contains invalid user ID');
        console.error('     3. Database connection issue');
      }
    } catch (error) {
      console.error('❌ Database query failed');
      console.error(`   - Error: ${error}`);
      throw new UnauthorizedException('Database error during authentication');
    }
    if (!user) {
      console.error('🚫 Authentication FAILED - throwing UnauthorizedException');

      throw new UnauthorizedException('User not found');
    }
    const validatedUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    console.log('✅ JWT Validation SUCCESSFUL');
    console.debug('📤 Returning validated user object:');
    console.debug(JSON.stringify(validatedUser, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return validatedUser;
  }
}

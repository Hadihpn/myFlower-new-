import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request1 = context.switchToHttp().getRequest();
    console.log('isActivate',);

    this.logger.log(`Incoming  Header: ${request1.headers}`);
    console.log(request1.headers)
    this.logger.log(`Incoming Authorization Header: ${request1.headers['authorization']}`);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    // 🔍 لاگ گرفتن از request
    const request = context.switchToHttp().getRequest();
    console.log('=== JWT Guard Debug ===');
    console.log('Authorization Header:', request.headers);
    console.log('All Headers:', request.headers);
    console.log('URL:', request.url);
    console.log('Method:', request.method);
    console.log('=======================');

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('err:', err);
    console.log('user:', user);
    console.log('info:', info?.message);
    if (err || !user) {
      console.log('error', err);

      throw err || new UnauthorizedException('Invalid or expired token');
    }
    return user;
  }
}

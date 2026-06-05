import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class WebJwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(WebJwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request1 = context.switchToHttp().getRequest();
    console.log('isActivate');

    // this.logger.log(`Incoming  Header: ${request1.headers}`);
    // console.log(request1.headers)
    // this.logger.log(`Incoming Authorization Header: ${request1.headers['authorization']}`);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if (isPublic) {
    //   return true;
    // }
    // // 🔍 لاگ گرفتن از request
    // const request = context.switchToHttp().getRequest();
    // console.log('=== JWT Guard Debug ===');
    // console.log('Authorization Header:', request.headers);
    // console.log('All Headers:', request.headers);
    // console.log('URL:', request.url);
    // console.log('Method:', request.method);
    // console.log('=======================');

    return super.canActivate(context);
  }

  // handleRequest(err, user, info, context: ExecutionContext) {
  //   console.log('err:', err);
  //   console.log('user:', user);
  //   console.log('info:', info?.message);
  //   const { req, res } = context.switchToHttp().getRequest();
  //   // const res = context.switchToHttp().getResponse();
  //   if (err || !user) {
  //     console.log('error', err);
  //     const currentUrl = req.originalUrl || req.url || '/';
  //     // جلوگیری از لوپ
  //     if (!currentUrl.startsWith('/login')) {
  //       const next = encodeURIComponent(currentUrl);
  //       res.redirect(`/login?next=${next}`);
  //     }
  //     return null;
  //   }
  //   return user;
  // }
  handleRequest(err, user, info, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const currentUrl = req.originalUrl || req.url || '/';
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (err) {
      throw err;
    }
    console.log('req.user', user);
  if (isPublic) {
    return user || null;
  }
    // اگر user نبود
    if (!user) {
      // // لندینگ اجازه دارد بدون لاگین باز شود
      // if (currentUrl === '/') {
      //   return null;
      // }

      // بقیه صفحات → redirect
      if (!currentUrl.startsWith('/login')) {
        const next = encodeURIComponent(currentUrl);
        res.redirect(`/login?next=${next}`);
      }

      return null;
    }

    return user;
  }
}

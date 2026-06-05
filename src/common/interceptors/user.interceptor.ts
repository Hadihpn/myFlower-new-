// src/interceptors/user.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    res.locals.currentPath = req.originalUrl;

    // دسترسی به کاربری که توسط Guard احراز هویت شده
    // (req.user معمولاً توسط Passport پس از تایید Guard پر می‌شود)
    if (req.user) {
      res.locals.user = req.user;

    } else {
      res.locals.user = null;
    }

    return next.handle();
  }
}

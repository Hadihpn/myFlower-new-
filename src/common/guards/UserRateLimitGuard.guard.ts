import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserRateLimitGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const endpoint = request.route.path;

    const key = `user_rate_limit:${userId}:${endpoint}`;
    const lastRequest = await this.cacheManager.get<number>(key);

    if (lastRequest) {
      const elapsed = Date.now() - lastRequest;
      if (elapsed < 30 * 1000) {
        // 30 ثانیه
        throw new HttpException(
          'Too many requests. Wait 30 seconds.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    await this.cacheManager.set(key, Date.now(), 30 * 1000);
    return true;
  }
}

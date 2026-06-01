import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DeviceRateLimitGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const deviceId = request.device.deviceId;
    
    const key = `device_rate_limit:${deviceId}`;
    const lastRequest = await this.cacheManager.get<number>(key);
    
    if (lastRequest) {
      const elapsed = Date.now() - lastRequest;
      if (elapsed < 1 * 60 * 1000) {
        throw new HttpException(
          'Too many requests. Wait 5 minutes.',
          HttpStatus.TOO_MANY_REQUESTS
        );
      }
    }
    
    await this.cacheManager.set(key, Date.now(), 5 * 60 * 1000); // TTL به میلی‌ثانیه
    return true;
  }
}

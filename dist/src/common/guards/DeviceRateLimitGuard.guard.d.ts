import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Cache } from 'cache-manager';
export declare class DeviceRateLimitGuard implements CanActivate {
    private cacheManager;
    constructor(cacheManager: Cache);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

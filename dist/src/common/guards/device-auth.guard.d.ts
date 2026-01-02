import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';
export declare class DeviceAuthGuard implements CanActivate {
    private deviceRepository;
    constructor(deviceRepository: Repository<Device>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

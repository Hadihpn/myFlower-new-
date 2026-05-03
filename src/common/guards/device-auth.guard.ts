import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';
import * as bcrypt from 'bcryptjs';
import { HashUtil } from '../utils/hash.util';

@Injectable()
export class DeviceAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const deviceId = request.headers['x-device-id'];
    const deviceToken = request.headers['x-device-token'];


    if (!deviceId || !deviceToken) {
      throw new UnauthorizedException('Device credentials required');
    }
    const hashedToken = await HashUtil.hash(deviceToken);
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .addSelect('device.tokenHash') // 👈 explicitly include password
      .where('device.deviceId = :deviceId', { deviceId })
      .leftJoinAndSelect('device.user', 'user')
      .getOne();
    // const device = await this.deviceRepository.findOne({
    //   where: { deviceId },
    //   relations: ['user'],
    // });

    if (!device) {
      throw new UnauthorizedException('Device not found');
    }
    const isValidToken = await bcrypt.compare(deviceToken, device.tokenHash);

    if (!isValidToken) {
      throw new UnauthorizedException('Invalid device token');
    }

    if (device.status !== 'active') {
      throw new UnauthorizedException('Device is not active');
    }

    request.device = device;
    return true;
  }
}

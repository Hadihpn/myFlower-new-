import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';
import { DeviceStatus } from '../devices/types/device-status.enum';
import { SubscriptionStatus } from '../subscription/types/subscription-status.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(SensorReading)
    private readingRepository: Repository<SensorReading>,
    @InjectRepository(UserSubscription)
    private subscriptionRepository: Repository<UserSubscription>,
  ) {}

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalDevices = await this.deviceRepository.count();
    const activeDevices = await this.deviceRepository.count({ where: { status: DeviceStatus.ACTIVE } });
    const totalReadings = await this.readingRepository.count();
    const activeSubscriptions = await this.subscriptionRepository.count({ where: { status: SubscriptionStatus.ACTIVE  } });

    return {
      totalUsers,
      totalDevices,
      activeDevices,
      totalReadings,
      activeSubscriptions,
      timestamp: new Date(),
    };
  }

  async getRecentUsers(limit: number = 10) {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getSystemHealth() {
    const offlineDevices = await this.deviceRepository.count({ where: { status: DeviceStatus.OFFLINE } });
    const maintenanceDevices = await this.deviceRepository.count({ where: { status: DeviceStatus.MAINTENANCE } });

    return {
      status: offlineDevices > 5 ? 'warning' : 'healthy',
      offlineDevices,
      maintenanceDevices,
    };
  }
}

import { Repository } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';
export declare class AdminService {
    private userRepository;
    private deviceRepository;
    private readingRepository;
    private subscriptionRepository;
    constructor(userRepository: Repository<User>, deviceRepository: Repository<Device>, readingRepository: Repository<SensorReading>, subscriptionRepository: Repository<UserSubscription>);
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalDevices: number;
        activeDevices: number;
        totalReadings: number;
        activeSubscriptions: number;
        timestamp: Date;
    }>;
    getRecentUsers(limit?: number): Promise<User[]>;
    getSystemHealth(): Promise<{
        status: string;
        offlineDevices: number;
        maintenanceDevices: number;
    }>;
}

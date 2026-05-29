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
        totalUsers: any;
        totalDevices: any;
        activeDevices: any;
        totalReadings: any;
        activeSubscriptions: any;
        timestamp: Date;
    }>;
    getRecentUsers(limit?: number): Promise<any>;
    getSystemHealth(): Promise<{
        status: string;
        offlineDevices: any;
        maintenanceDevices: any;
    }>;
}

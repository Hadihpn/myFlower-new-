import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalDevices: number;
        activeDevices: number;
        totalReadings: number;
        activeSubscriptions: number;
        timestamp: Date;
    }>;
    getRecentUsers(): Promise<import("../users/entities/user.entity").User[]>;
    getSystemHealth(): Promise<{
        status: string;
        offlineDevices: number;
        maintenanceDevices: number;
    }>;
}

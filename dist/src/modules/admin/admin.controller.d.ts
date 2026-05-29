import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalUsers: any;
        totalDevices: any;
        activeDevices: any;
        totalReadings: any;
        activeSubscriptions: any;
        timestamp: Date;
    }>;
    getRecentUsers(): Promise<any>;
    getSystemHealth(): Promise<{
        status: string;
        offlineDevices: any;
        maintenanceDevices: any;
    }>;
}

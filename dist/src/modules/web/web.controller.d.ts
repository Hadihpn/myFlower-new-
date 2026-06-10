import { Request, Response } from 'express';
import { WebService } from './web.service';
export declare class WebController {
    private webservice;
    constructor(webservice: WebService);
    getLoginPage(req: Request, res: Response): void | {
        title: string;
        success: string;
        error: string;
        email: string | import("qs").ParsedQs | (string | import("qs").ParsedQs)[];
    };
    getRegisterPage(req: Request, res: Response): void | {
        title: string;
    };
    getDashboard(req: Request): Promise<{
        title: string;
        user: any;
        currentPath: string;
    }>;
    getDashboardData(req: Request): Promise<{
        plants: {
            name: string;
            imageUrl: string | null;
        }[];
        deviceCount: number;
        devices: {
            id: number;
            name: string;
            status: import("../devices/types/device-status.enum").DeviceStatus;
            createdAt: Date;
            plants: {
                name: string;
                imageUrl: string | null;
            }[];
            latestReadings: import("../sensor-readings/entities/sensor-reading.entity").SensorReading[];
        }[];
        todayTasks: import("../care-task/entities/care-task.entity").CareTask[];
    }>;
    landing(req: any): {
        title: string;
        user: any;
    };
    test(): string;
}

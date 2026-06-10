import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { DevicesService } from '../devices/devices.service';
import { CareTaskService } from '../care-task/care-task.services';
import { SensorReadingsService } from '../sensor-readings/sensor-readings.service';
export declare class WebService {
    private userPlantSelectionsService;
    private devicesService;
    private careTaskService;
    private sensorReadingsService;
    constructor(userPlantSelectionsService: UserPlantSelectionsService, devicesService: DevicesService, careTaskService: CareTaskService, sensorReadingsService: SensorReadingsService);
    getUserDashboard(userId: number): Promise<{
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
    private resolvePlantInfo;
}

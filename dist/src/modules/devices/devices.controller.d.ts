import { DevicesService } from './devices.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CalibrationDto } from './dto/calibration.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    registerDevice(userId: number, registerDeviceDto: RegisterDeviceDto): Promise<{
        message: string;
        device: import("./entities/device.entity").Device;
        token: string;
    }>;
    findUserDevices(userId: number): Promise<import("./entities/device.entity").Device[]>;
    findDeviceById(id: number): Promise<import("./entities/device.entity").Device>;
    updateDevice(id: number, userId: number, updateDeviceDto: UpdateDeviceDto): Promise<import("./entities/device.entity").Device>;
    deleteDevice(id: number, userId: number): Promise<void>;
    calibrateDevice(id: number, userId: number, calibrationDto: CalibrationDto): Promise<import("./entities/device.entity").Device>;
}

import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DevicesService {
    private deviceRepository;
    constructor(deviceRepository: Repository<Device>);
    registerDevice(userId: number, registerDeviceDto: RegisterDeviceDto): Promise<{
        device: Device;
        token: string;
    }>;
    findUserDevices(userId: number): Promise<Device[]>;
    findDeviceById(id: number): Promise<Device>;
    findDeviceByDeviceId(deviceId: string): Promise<Device>;
    updateDevice(id: number, userId: number, updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    deleteDevice(id: number, userId: number): Promise<void>;
    updateLastSeen(deviceId: string): Promise<void>;
    verifyDeviceToken(deviceId: string, token: string): Promise<Device | null>;
    calibrateDevice(id: number, userId: number, calibration: any): Promise<Device>;
}

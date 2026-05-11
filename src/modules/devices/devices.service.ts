import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { HashUtil } from '@common/utils/hash.util';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async registerDevice(
    userId: number,
    registerDeviceDto: RegisterDeviceDto,
  ): Promise<{ device: Device; token: string }> {
    const { deviceId, name, location } = registerDeviceDto;

    // Check if device already exists
    const existingDevice = await this.deviceRepository.findOne({
      where: { deviceId },
    });

    if (existingDevice) {
      throw new ConflictException('Device with this ID already exists');
    }

    // Generate token
    const token = HashUtil.generateRandomToken(32);
    const tokenHash = await HashUtil.hash(token);

    // Create device
    const device = this.deviceRepository.create({
      userId,
      deviceId,
      name,
      location,
      tokenHash,
    });

    const savedDevice = await this.deviceRepository.save(device);

    return { device: savedDevice, token };
  }

  async findUserDevices(userId: number): Promise<Device[]> {
    return this.deviceRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findDeviceById(id: string): Promise<Device> {
    console.log("deviceId",id)
    const device = await this.deviceRepository.findOne({
      where: { deviceId:id },
      relations: ['user'],
    });

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return device;
  }

  async  findDeviceByDeviceId(deviceId: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { deviceId },
      relations: ['user'],
    });

    if (!device) {
      throw new NotFoundException(`Device with ID ${deviceId} not found`);
    }

    return device;
  }

  async updateDevice(
    id: string,
    userId: number,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    const device = await this.findDeviceById(id);

    // Verify ownership
    if (device.userId !== userId) {
      throw new UnauthorizedException('You do not own this device');
    }

    Object.assign(device, updateDeviceDto);
    return this.deviceRepository.save(device);
  }

  async deleteDevice(id: string, userId: number): Promise<void> {
    const device = await this.findDeviceById(id);

    // Verify ownership
    if (device.userId !== userId) {
      throw new UnauthorizedException('You do not own this device');
    }

    await this.deviceRepository.remove(device);
  }

  async updateLastSeen(deviceId: string): Promise<void> {
    await this.deviceRepository.update(
      { deviceId },
      { lastSeen: new Date() },
    );
  }

  async verifyDeviceToken(
    deviceId: string,
    token: string,
  ): Promise<Device | null> {
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .addSelect('device.tokenHash')
      .where('device.deviceId = :deviceId', { deviceId })
      .getOne();

    if (!device) {
      return null;
    }

    const isValidToken = await HashUtil.compare(token, device.tokenHash);

    if (!isValidToken) {
      return null;
    }

    return device;
  }

  async calibrateDevice(
    id: string,
    userId: number,
    calibration: any,
  ): Promise<Device> {
    const device = await this.findDeviceById(id);

    // Verify ownership
    if (device.userId !== userId) {
      throw new UnauthorizedException('You do not own this device');
    }

    device.calibration = { ...device.calibration, ...calibration };
    return this.deviceRepository.save(device);
  }
}
  
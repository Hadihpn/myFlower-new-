import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';

@Entity('sensor_readings')
@Index(['deviceId', 'timestamp'])
export class SensorReading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_id' })
  deviceId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperature: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  moisture: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  light: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  humidity: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  anomaly: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Device, (device) => device.sensorReadings)
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
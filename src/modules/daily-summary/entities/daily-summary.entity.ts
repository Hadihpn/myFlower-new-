import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';

@Entity('daily_summaries')
@Unique(['deviceId', 'date'])
@Index(['deviceId', 'date'])
export class DailySummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_id' })
  deviceId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'min_temperature', type: 'decimal', precision: 5, scale: 2 })
  minTemperature: number;

  @Column({ name: 'max_temperature', type: 'decimal', precision: 5, scale: 2 })
  maxTemperature: number;

  @Column({ name: 'avg_temperature', type: 'decimal', precision: 5, scale: 2 })
  avgTemperature: number;

  @Column({ name: 'min_moisture', type: 'decimal', precision: 5, scale: 2 })
  minMoisture: number;

  @Column({ name: 'max_moisture', type: 'decimal', precision: 5, scale: 2 })
  maxMoisture: number;

  @Column({ name: 'avg_moisture', type: 'decimal', precision: 5, scale: 2 })
  avgMoisture: number;

  @Column({ name: 'min_light', type: 'decimal', precision: 10, scale: 2 })
  minLight: number;

  @Column({ name: 'max_light', type: 'decimal', precision: 10, scale: 2 })
  maxLight: number;

  @Column({ name: 'avg_light', type: 'decimal', precision: 10, scale: 2 })
  avgLight: number;

  @Column({ name: 'reading_count', type: 'int' })
  readingCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Device)
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
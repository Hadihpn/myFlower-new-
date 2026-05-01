import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn } from 'typeorm';

@Entity('device_sensor_stats')
@Index(['deviceId'], { unique: true })
export class DeviceSensorStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_id', unique: true })
  deviceId: string;

  // Temperature Welford accumulators
  @Column({ name: 'temp_count', default: 0 })
  tempCount: number;

  @Column({ name: 'temp_mean', type: 'float', default: 0 })
  tempMean: number;

  @Column({ name: 'temp_m2', type: 'float', default: 0 })
  tempM2: number;

  // Moisture Welford accumulators
  @Column({ name: 'moisture_count', default: 0 })
  moistureCount: number;

  @Column({ name: 'moisture_mean', type: 'float', default: 0 })
  moistureMean: number;

  @Column({ name: 'moisture_m2', type: 'float', default: 0 })
  moistureM2: number;

  // Light Welford accumulators
  @Column({ name: 'light_count', default: 0 })
  lightCount: number;

  @Column({ name: 'light_mean', type: 'float', default: 0 })
  lightMean: number;

  @Column({ name: 'light_m2', type: 'float', default: 0 })
  lightM2: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

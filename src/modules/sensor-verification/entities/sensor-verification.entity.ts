import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Device } from '@modules/devices/entities/device.entity';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { VerificationStatus } from '../types/verification-status.enum';
import { ChangeType } from '../types/change-type.enum';
import { Confidence } from '../types/confidence.enum';

@Entity('sensor_verifications')
export class SensorVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_id' })
  deviceId: number;

  @Column({ name: 'trigger_reading_id' })
  triggerReadingId: number;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;

  @Column({
    name: 'change_type',
    type: 'enum',
    enum: ChangeType,
  })
  changeType: ChangeType;

  @Column({ name: 'change_magnitude', type: 'decimal', precision: 10, scale: 2 })
  changeMagnitude: number;

  @Column({ name: 'verification_readings', type: 'json' })
  verificationReadings: any[];

  @Column({ default: false })
  confirmed: boolean;

  @Column({
    type: 'enum',
    enum: Confidence,
    nullable: true,
  })
  confidence: Confidence;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Device)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => SensorReading)
  @JoinColumn({ name: 'trigger_reading_id' })
  triggerReading: SensorReading;
}
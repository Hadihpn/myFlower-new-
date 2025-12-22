import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'device_id', unique: true })
  deviceId: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.ACTIVE,
  })
  status: DeviceStatus;

  @Column({ name: 'token_hash', select: false })
  tokenHash: string;

  @Column({ name: 'last_seen', type: 'timestamp', nullable: true })
  lastSeen: Date;

  @Column({ type: 'json', nullable: true })
  calibration: DeviceCalibration;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => SensorReading, (reading) => reading.device)
  sensorReadings: SensorReading[];

  @OneToMany(() => UserPlantSelection, (selection) => selection.device)
  plantSelections: UserPlantSelection[];

  @OneToMany(() => UserAction, (action) => action.device)
  actions: UserAction[];
}

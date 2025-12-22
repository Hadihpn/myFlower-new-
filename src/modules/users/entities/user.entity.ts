import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../types/user-role.enum';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => UserSubscription, (subscription) => subscription.user)
  subscriptions: UserSubscription[];

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToMany(() => UserPlantSelection, (selection) => selection.user)
  plantSelections: UserPlantSelection[];

  @OneToMany(() => UserAction, (action) => action.user)
  actions: UserAction[];
}

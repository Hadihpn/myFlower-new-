
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { ActionType } from '../types/action-type.enum';

@Entity('user_actions')
@Index(['selectionId', 'actionDate'])
export class UserAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'device_id' })
  deviceId: number;

  @Column({ name: 'selection_id' })
  selectionId: number;

  @Column({
    name: 'action_type',
    type: 'enum',
    enum: ActionType,
  })
  actionType: ActionType;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'action_date', type: 'timestamp' })
  actionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.actions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Device, (device) => device.actions)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => UserPlantSelection, (selection) => selection.actions)
  @JoinColumn({ name: 'selection_id' })
  selection: UserPlantSelection;
}

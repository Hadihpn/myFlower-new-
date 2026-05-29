import { UserPlantSelection } from '@/modules/user-plant-selections/entities/user-plant-selection.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { CarePlanStatus } from '../enums/carePlanStatus.enum';
import { GeneratorType } from '../enums/generatorType.enum';
import { CareTask } from '@/modules/care-task/entities/care-task.entity';

@Entity('care_plans')
@Index(['userPlantSelectionId'])
@Index(['status'])
export class CarePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_plant_selection_id' })
  userPlantSelectionId: number;

  @Column({
    type: 'enum',
    enum: CarePlanStatus,
    default: CarePlanStatus.ACTIVE,
  })
  status: CarePlanStatus;

  @Column({
    type: 'enum',
    enum: GeneratorType,
    name: 'generator_type',
  })
  generatorType: GeneratorType;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'sensor_snapshot', type: 'json', nullable: true })
  sensorSnapshot: Record<string, any>;

  @Column({ name: 'ai_recommendations', type: 'text', nullable: true })
  aiRecommendations: string;
  // @Column({ name: 'ai_request_time' })
  // aiRequestedTime: number;
  // @CreateDateColumn({ name: 'ai_used_at' })
  // lastAiUsed: Date;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  // @CreateDateColumn({ name: 'active', default: true })
  // active: boolean;
  // Relations
  @ManyToOne(() => UserPlantSelection, { nullable: false })
  @JoinColumn({ name: 'user_plant_selection_id' })
  userPlantSelection: UserPlantSelection;

  @OneToMany(() => CareTask, (task) => task.carePlan)
  tasks: CareTask[];
}

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
import { TaskType } from '../enums/taskType.enum';
import { OptimalTime } from '../enums/optimalType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';
import { CarePlan } from '@/modules/care-plan/entities/care-plan.entity';
import { CareTaskFeedback } from '@/modules/care-task-feedback/entities/care-task-feedback.entity';
// import { CareTaskFeedback } from '@/modules/care-task-feedback/entities/care-task-feedback.entity';


@Entity('care_tasks')
@Index(['carePlanId'])
@Index(['scheduledDate'])
@Index(['status'])
export class CareTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'care_plan_id' })
  carePlanId: number;

  @Column({
    type: 'enum',
    enum: TaskType,
    name: 'task_type',
  })
  taskType: TaskType;

  @Column({ name: 'scheduled_date', type: 'date' })
  scheduledDate: Date;

  @Column({
    type: 'enum',
    enum: OptimalTime,
    name: 'optimal_time',
    nullable: true,
  })
  optimalTime: OptimalTime;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ name: 'shop_product_type', nullable: true })
  shopProductType: string;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => CarePlan, (plan) => plan.tasks, { nullable: false })
  @JoinColumn({ name: 'care_plan_id' })
  carePlan: CarePlan;

  @OneToMany(() => CareTaskFeedback, (feedback) => feedback.careTask)
  feedbacks: CareTaskFeedback[];
}

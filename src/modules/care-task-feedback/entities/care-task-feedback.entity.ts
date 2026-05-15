import { CareTask } from '@/modules/care-task/entities/care-task.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { FeedbackAction } from '../enums/feedbackAction.enum';


@Entity('care_task_feedbacks')
@Index(['careTaskId'])
@Index(['userId'])
export class CareTaskFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'care_task_id' })
  careTaskId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'enum',
    enum: FeedbackAction,
  })
  action: FeedbackAction;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => CareTask, (task) => task.feedbacks, { nullable: false })
  @JoinColumn({ name: 'care_task_id' })
  careTask: CareTask;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

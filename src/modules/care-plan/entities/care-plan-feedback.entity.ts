import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CarePlan } from './care-plan.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('care_plan_feedbacks')
export class CarePlanFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'care_plan_id' })
  carePlanId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'text' })
  feedback: string;

  @Column({ name: 'triggered_regeneration', default: false })
  triggeredRegeneration: boolean;

  @ManyToOne(() => CarePlan)
  @JoinColumn({ name: 'care_plan_id' })
  carePlan: CarePlan;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

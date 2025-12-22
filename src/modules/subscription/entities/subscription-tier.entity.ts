import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { BillingCycle } from '../types/billing-cycle.enum';
import { UserSubscription } from './user-subscription.entity';

@Entity('subscription_tiers')
export class SubscriptionTier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'plant_slot_limit', type: 'int' })
  plantSlotLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'billing_cycle',
    type: 'enum',
    enum: BillingCycle,
    default: BillingCycle.MONTHLY,
  })
  billingCycle: BillingCycle;

  @Column({ type: 'json', nullable: true })
  features: Record<string, any>;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => UserSubscription, (subscription) => subscription.tier)
  subscriptions: UserSubscription[];
}

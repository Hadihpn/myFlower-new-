// src/care-schedules/entities/care-schedules.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum CareTaskType {
  WATERING = 'watering',
  FERTILIZING = 'fertilizing',
  PRUNING = 'pruning',
  PESTICIDE = 'pesticide',
}

export enum CareScheduleStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  OVERDUE = 'overdue', // ← این را حفظ کنید (در کد قبلی بود)
}

@Entity('care_schedules')
@Index(['userId', 'scheduledAt'])
@Index(['deviceId', 'status'])
@Index(['carePlanId'])
export class CareSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'device_id', nullable: true }) // ← nullable باید باشد
  deviceId: string;

  @Column({ type: 'int', name: 'plant_species_id' })
  plantSpeciesId: number;

  @Column({ type: 'enum', enum: CareTaskType, name: 'task_type' })
  taskType: CareTaskType;

  @Column({ type: 'timestamp', name: 'scheduled_at' })
  scheduledAt: Date;

  @Column({
    type: 'enum',
    enum: CareScheduleStatus,
    name: 'status',
    default: CareScheduleStatus.PENDING,
  })
  status: CareScheduleStatus;

  @Column({ type: 'timestamp', name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'timestamp', name: 'last_ai_call_at', nullable: true })
  lastAiCallAt: Date;

  // ========== فیلدهای جدید ==========

  @Column({ type: 'uuid', name: 'care_plan_id', nullable: true })
  carePlanId: string;

  @Column({ type: 'int', name: 'product_id', nullable: true })
  productId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dosage: string;

  // ========== فیلدهای timestamp ==========
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

// src/care-plans/entities/care-plan.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum CarePlanStatus {
  ACTIVE = 'active',
  REPLACED = 'replaced',
  ARCHIVED = 'archived',
}

interface FertilizerScheduleItem {
  dayOfCycle: number;
  productId: number;
  dosageGrams: number;
}

interface PesticideScheduleItem {
  dayOfCycle: number;
  productId: number;
  dosageMl: number;
}

@Entity('care_plans')
@Index(['userId', 'deviceId', 'status'])
@Index(['plantSpeciesId', 'status'])
export class CarePlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ name: 'device_id' })
  deviceId: string;

  @Column({ type: 'int', name: 'plant_species_id' })
  plantSpeciesId: number;

  @Column({ type: 'int', name: 'watering_frequency_days' })
  wateringFrequencyDays: number;

  @Column({ type: 'int', name: 'fertilizing_frequency_days', nullable: true })
  fertilizingFrequencyDays: number;

  @Column({ type: 'jsonb', name: 'fertilizer_schedule', nullable: true })
  fertilizerSchedule: FertilizerScheduleItem[];

  @Column({ type: 'jsonb', name: 'pesticide_schedule', nullable: true })
  pesticideSchedule: PesticideScheduleItem[];

  @Column({ type: 'int', name: 'skip_count', default: 0 })
  skipCount: number; // تعداد دفعاتی که کاربر task رو skip کرده

  @Column({ type: 'enum', enum: CarePlanStatus, default: CarePlanStatus.ACTIVE })
  status: CarePlanStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid', name: 'replaced_by_plan_id', nullable: true })
  replacedByPlanId: string; // اگه این plan جایگزین شده، ID برنامه جدید

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

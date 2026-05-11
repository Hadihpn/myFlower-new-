// src/fertilizer-products/entities/fertilizer-product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProductType {
  NPK = 'npk',
  ORGANIC = 'organic',
  PESTICIDE = 'pesticide',
}

@Entity('fertilizer_products')
export class FertilizerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column({ type: 'varchar', length: 50, name: 'npk_ratio', nullable: true })
  npkRatio: string; // مثلاً "20-20-20"

  @Column({ type: 'text', name: 'active_ingredient', nullable: true })
  activeIngredient: string; // برای سموم

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'recommended_dosage_per_liter', nullable: true })
  recommendedDosagePerLiter: number; // گرم یا میلی‌لیتر به ازای هر لیتر آب

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

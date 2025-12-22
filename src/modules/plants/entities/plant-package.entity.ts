import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { PlantPackageItem } from './plant-package-item.entity';

@Entity('plant_packages')
export class PlantPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: PlantCategory,
  })
  category: PlantCategory;

  @Column({
    type: 'enum',
    enum: PlantDifficulty,
  })
  difficulty: PlantDifficulty;

  @Column({ name: 'plant_count', type: 'int' })
  plantCount: number;

  @Column({ type: 'json' })
  thresholds: PlantThresholds;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ default: false })
  popular: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => PlantPackageItem, (item) => item.package)
  items: PlantPackageItem[];

  @OneToMany(() => UserPlantSelection, (selection) => selection.package)
  userSelections: UserPlantSelection[];
}
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
import { PlantSpecies } from './plant-species.entity';

@Entity('plant_groups')
export class PlantGroup {
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

  @Column({ type: 'json' })
  thresholds: PlantThresholds;

  @Column({ name: 'care_instructions', type: 'json' })
  careInstructions: Record<string, any>;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => PlantSpecies, (species) => species.group)
  species: PlantSpecies[];
}


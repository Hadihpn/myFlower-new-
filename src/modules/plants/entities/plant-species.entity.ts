import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlantGroup } from './plant-group.entity';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { PlantPackageItem } from './plant-package-item.entity';

@Entity('plant_species')
export class PlantSpecies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', nullable: true })
  groupId: number;

  @Column()
  name: string;

  @Column({ name: 'scientific_name' })
  scientificName: string;

  @Column({ name: 'common_names', type: 'simple-array' })
  commonNames: string[];

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

  @Column({ type: 'json' })
  watering: Record<string, any>;

  @Column({ type: 'json' })
  fertilization: Record<string, any>;

  @Column({ name: 'growth_info', type: 'json' })
  growthInfo: Record<string, any>;

  @Column({ name: 'harvest_info', type: 'json', nullable: true })
  harvestInfo: Record<string, any>;

  @Column({ name: 'common_problems', type: 'json' })
  commonProblems: any[];

  @Column({ name: 'companion_plants', type: 'simple-array' })
  companionPlants: string[];

  @Column({ name: 'avoid_plants', type: 'simple-array' })
  avoidPlants: string[];

  @Column({ type: 'json' })
  toxicity: Record<string, any>;

  @Column({ type: 'simple-array' })
  tips: string[];

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => PlantGroup, (group) => group.species)
  @JoinColumn({ name: 'group_id' })
  group: PlantGroup;

  @OneToMany(() => PlantPackageItem, (item) => item.plantSpecies)
  packageItems: PlantPackageItem[];

  @OneToMany(() => UserPlantSelection, (selection) => selection.plantSpecies)
  userSelections: UserPlantSelection[];
}
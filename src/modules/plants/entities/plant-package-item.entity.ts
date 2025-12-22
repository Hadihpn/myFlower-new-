import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { PlantPackage } from './plant-package.entity';
import { PlantSpecies } from './plant-species.entity';

@Entity('plant_package_items')
@Unique(['packageId', 'plantSpeciesId'])
export class PlantPackageItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'package_id' })
  packageId: number;

  @Column({ name: 'plant_species_id' })
  plantSpeciesId: number;

  @Column({ type: 'int' })
  position: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => PlantPackage, (pkg) => pkg.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'package_id' })
  package: PlantPackage;

  @ManyToOne(() => PlantSpecies, (species) => species.packageItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plant_species_id' })
  plantSpecies: PlantSpecies;
}

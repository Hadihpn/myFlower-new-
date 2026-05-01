import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { PlantPackage } from '@modules/plants/entities/plant-package.entity';
import { PlantSpecies } from '@modules/plants/entities/plant-species.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';

@Entity('user_plant_selections')
@Check(`(package_id IS NOT NULL AND plant_species_id IS NULL) OR (package_id IS NULL AND plant_species_id IS NOT NULL)`)
export class UserPlantSelection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'device_id' })
  deviceId: string;

  @Column({ name: 'package_id', nullable: true })
  packageId: number;

  @Column({ name: 'plant_species_id', nullable: true })
  plantSpeciesId: number;

  @Column()
  nickname: string;

  @Column({ name: 'planted_date', type: 'date', nullable: true })
  plantedDate: Date;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'currently_monitoring', default: false })
  currentlyMonitoring: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.plantSelections)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Device, (device) => device.plantSelections)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => PlantPackage, (pkg) => pkg.userSelections, { nullable: true })
  @JoinColumn({ name: 'package_id' })
  package: PlantPackage;

  @ManyToOne(() => PlantSpecies, (species) => species.userSelections, {
    nullable: true,
  })
  @JoinColumn({ name: 'plant_species_id' })
  plantSpecies: PlantSpecies;

  @OneToMany(() => UserAction, (action) => action.selection)
  actions: UserAction[];
}

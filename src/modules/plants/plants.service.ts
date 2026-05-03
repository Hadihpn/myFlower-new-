import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantGroup } from './entities/plant-group.entity';
import { PlantSpecies } from './entities/plant-species.entity';
import { PlantPackage } from './entities/plant-package.entity';
import { PlantPackageItem } from './entities/plant-package-item.entity';
import { CreatePlantGroupDto } from './dto/create-plant-group.dto';
import { UpdatePlantGroupDto } from './dto/update-plant-group.dto';
import { CreatePlantSpeciesDto } from './dto/create-plant-species.dto';
import { UpdatePlantSpeciesDto } from './dto/update-plant-species.dto';
import { CreatePlantPackageDto } from './dto/create-plant-package.dto';
import { UpdatePlantPackageDto } from './dto/update-plant-package.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantGroup)
    private groupRepository: Repository<PlantGroup>,
    @InjectRepository(PlantSpecies)
    private speciesRepository: Repository<PlantSpecies>,
    @InjectRepository(PlantPackage)
    private packageRepository: Repository<PlantPackage>,
    @InjectRepository(PlantPackageItem)
    private packageItemRepository: Repository<PlantPackageItem>,
  ) {}

  // ========== Plant Groups ==========
  async createGroup(
    createGroupDto: CreatePlantGroupDto,
  ): Promise<PlantGroup> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAllGroups(): Promise<PlantGroup[]> {
    return this.groupRepository.find({
      where: { active: true },
      order: { name: 'ASC' },
    });
  }

  async findGroupById(id: number): Promise<PlantGroup> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['species'],
    });

    if (!group) {
      throw new NotFoundException(`Plant group with ID ${id} not found`);
    }

    return group;
  }

  async updateGroup(
    id: number,
    updateGroupDto: UpdatePlantGroupDto,
  ): Promise<PlantGroup> {
    const group = await this.findGroupById(id);

    Object.assign(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async deleteGroup(id: number): Promise<void> {
    const group = await this.findGroupById(id);
    await this.groupRepository.remove(group);
  }

  async uploadGroupImage(id: number, file: Express.Multer.File): Promise<PlantGroup> {
    const group = await this.findGroupById(id);
    
    // Delete old image if exists
    if (group.imageUrl) {
      this.deleteImageFile(group.imageUrl);
    }

    group.imageUrl = `/uploads/plants/${file.filename}`;
    return this.groupRepository.save(group);
  }

  // ========== Plant Species ==========
  async createSpecies(
    createSpeciesDto: CreatePlantSpeciesDto,
  ): Promise<PlantSpecies> {
    const species = this.speciesRepository.create(createSpeciesDto);
    return this.speciesRepository.save(species);
  }

  async findAllSpecies(): Promise<PlantSpecies[]> {
    return this.speciesRepository.find({
      where: { active: true },
      relations: ['group'],
      order: { name: 'ASC' },
    });
  }

  async findSpeciesByCategory(category: string): Promise<PlantSpecies[]> {
    return this.speciesRepository.find({
      where: { category: category as any, active: true },
      relations: ['group'],
      order: { name: 'ASC' },
    });
  }

  async findSpeciesById(id: number): Promise<PlantSpecies> {
    const species = await this.speciesRepository.findOne({
      where: { id },
      relations: ['group'],
    });

    if (!species) {
      throw new NotFoundException(`Plant species with ID ${id} not found`);
    }

    return species;
  }

  async updateSpecies(
    id: number,
    updateSpeciesDto: UpdatePlantSpeciesDto,
  ): Promise<PlantSpecies> {
    const species = await this.findSpeciesById(id);

    Object.assign(species, updateSpeciesDto);
    return this.speciesRepository.save(species);
  }

  async deleteSpecies(id: number): Promise<void> {
    const species = await this.findSpeciesById(id);
    await this.speciesRepository.remove(species);
  }

  async uploadSpeciesImage(id: number, file: Express.Multer.File): Promise<PlantSpecies> {
    const species = await this.findSpeciesById(id);
    
    // Delete old image if exists
    if (species.imageUrl) {
      this.deleteImageFile(species.imageUrl);
    }

    species.imageUrl = `/uploads/plants/${file.filename}`;
    return this.speciesRepository.save(species);
  }

  // ========== Plant Packages ==========
  async createPackage(
    createPackageDto: CreatePlantPackageDto,
  ): Promise<PlantPackage> {
    const { items, ...packageData } = createPackageDto;

    // Verify all plant species exist
    for (const item of items) {
      await this.findSpeciesById(item.plantSpeciesId);
    }

    // Create package
    const plantPackage = this.packageRepository.create(packageData);
    const savedPackage = await this.packageRepository.save(plantPackage);

    // Create package items
    for (const item of items) {
      const packageItem = this.packageItemRepository.create({
        packageId: savedPackage.id,
        plantSpeciesId: item.plantSpeciesId,
        position: item.position,
      });
      await this.packageItemRepository.save(packageItem);
    }

    return this.findPackageById(savedPackage.id);
  }

  async findAllPackages(): Promise<PlantPackage[]> {
    return this.packageRepository.find({
      where: { active: true },
      relations: ['items', 'items.plantSpecies'],
      order: { popular: 'DESC', name: 'ASC' },
    });
  }

  async findPopularPackages(): Promise<PlantPackage[]> {
    return this.packageRepository.find({
      where: { active: true, popular: true },
      relations: ['items', 'items.plantSpecies'],
      order: { name: 'ASC' },
    });
  }

  async findPackageById(id: number): Promise<PlantPackage> {
    const plantPackage = await this.packageRepository.findOne({
      where: { id },
      relations: ['items', 'items.plantSpecies'],
    });

    if (!plantPackage) {
      throw new NotFoundException(`Plant package with ID ${id} not found`);
    }

    return plantPackage;
  }

  async updatePackage(
    id: number,
    updatePackageDto: UpdatePlantPackageDto,
  ): Promise<PlantPackage> {
    const { items, ...packageData } = updatePackageDto;
    const plantPackage = await this.findPackageById(id);

    // Update package data
    Object.assign(plantPackage, packageData);
    await this.packageRepository.save(plantPackage);

    // Update items if provided
    if (items) {
      // Delete existing items
      await this.packageItemRepository.delete({ packageId: id });

      // Create new items
      for (const item of items) {
        await this.findSpeciesById(item.plantSpeciesId);
        const packageItem = this.packageItemRepository.create({
          packageId: id,
          plantSpeciesId: item.plantSpeciesId,
          position: item.position,
        });
        await this.packageItemRepository.save(packageItem);
      }
    }

    return this.findPackageById(id);
  }

  async deletePackage(id: number): Promise<void> {
    const plantPackage = await this.findPackageById(id);
    await this.packageRepository.remove(plantPackage);
  }

  async uploadPackageImage(id: number, file: Express.Multer.File): Promise<PlantPackage> {
    const plantPackage = await this.findPackageById(id);
    
    // Delete old image if exists
    if (plantPackage.imageUrl) {
      this.deleteImageFile(plantPackage.imageUrl);
    }

    plantPackage.imageUrl = `/uploads/packages/${file.filename}`;
    return this.packageRepository.save(plantPackage);
  }

  // ========== Helper Methods ==========
  private deleteImageFile(imageUrl: string): void {
    try {
      const filePath = path.join(process.cwd(), imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting image file:', error);
    }
  }
}

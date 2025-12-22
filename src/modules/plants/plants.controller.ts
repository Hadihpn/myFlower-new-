import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PlantsService } from './plants.service';
import { CreatePlantGroupDto } from './dto/create-plant-group.dto';
import { UpdatePlantGroupDto } from './dto/update-plant-group.dto';
import { CreatePlantSpeciesDto } from './dto/create-plant-species.dto';
import { UpdatePlantSpeciesDto } from './dto/update-plant-species.dto';
import { CreatePlantPackageDto } from './dto/create-plant-package.dto';
import { UpdatePlantPackageDto } from './dto/update-plant-package.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';
import { UserRole } from '@modules/users/types/user-role.enum';
import { Public } from '@common/decorators/public.decorator';

// Multer configuration for file upload
const plantStorage = diskStorage({
  destination: './uploads/plants',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `plant-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

const packageStorage = diskStorage({
  destination: './uploads/packages',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `package-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@ApiTags('Plants')
@ApiBearerAuth('JWT')
@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  // ========== Plant Groups ==========
  @Post('groups')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create plant group (Admin only)' })
  @ApiResponse({ status: 201, description: 'Group created successfully' })
  createGroup(@Body() createGroupDto: CreatePlantGroupDto) {
    return this.plantsService.createGroup(createGroupDto);
  }

  @Public()
  @Get('groups')
  @ApiOperation({ summary: 'Get all plant groups' })
  @ApiResponse({ status: 200, description: 'List of plant groups' })
  findAllGroups() {
    return this.plantsService.findAllGroups();
  }

  @Public()
  @Get('groups/:id')
  @ApiOperation({ summary: 'Get plant group by ID' })
  @ApiResponse({ status: 200, description: 'Plant group found' })
  findGroupById(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.findGroupById(id);
  }

  @Patch('groups/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update plant group (Admin only)' })
  @ApiResponse({ status: 200, description: 'Group updated successfully' })
  updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdatePlantGroupDto,
  ) {
    return this.plantsService.updateGroup(id, updateGroupDto);
  }

  @Delete('groups/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete plant group (Admin only)' })
  @ApiResponse({ status: 200, description: 'Group deleted successfully' })
  deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.deleteGroup(id);
  }

  @Post('groups/:id/image')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image', { storage: plantStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload group image (Admin only)' })
  uploadGroupImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.plantsService.uploadGroupImage(id, file);
  }

  // ========== Plant Species ==========
  @Post('species')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create plant species (Admin only)' })
  @ApiResponse({ status: 201, description: 'Species created successfully' })
  createSpecies(@Body() createSpeciesDto: CreatePlantSpeciesDto) {
    return this.plantsService.createSpecies(createSpeciesDto);
  }

  @Public()
  @Get('species')
  @ApiOperation({ summary: 'Get all plant species' })
  @ApiResponse({ status: 200, description: 'List of plant species' })
  findAllSpecies() {
    return this.plantsService.findAllSpecies();
  }

  @Public()
  @Get('species/category/:category')
  @ApiOperation({ summary: 'Get species by category' })
  @ApiResponse({ status: 200, description: 'List of plant species' })
  findSpeciesByCategory(@Param('category') category: string) {
    return this.plantsService.findSpeciesByCategory(category);
  }

  @Public()
  @Get('species/:id')
  @ApiOperation({ summary: 'Get plant species by ID' })
  @ApiResponse({ status: 200, description: 'Plant species found' })
  findSpeciesById(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.findSpeciesById(id);
  }

  @Patch('species/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update plant species (Admin only)' })
  @ApiResponse({ status: 200, description: 'Species updated successfully' })
  updateSpecies(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpeciesDto: UpdatePlantSpeciesDto,
  ) {
    return this.plantsService.updateSpecies(id, updateSpeciesDto);
  }

  @Delete('species/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete plant species (Admin only)' })
  @ApiResponse({ status: 200, description: 'Species deleted successfully' })
  deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.deleteSpecies(id);
  }

  @Post('species/:id/image')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image', { storage: plantStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload species image (Admin only)' })
  uploadSpeciesImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.plantsService.uploadSpeciesImage(id, file);
  }

  // ========== Plant Packages ==========
  @Post('packages')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create plant package (Admin only)' })
  @ApiResponse({ status: 201, description: 'Package created successfully' })
  createPackage(@Body() createPackageDto: CreatePlantPackageDto) {
    return this.plantsService.createPackage(createPackageDto);
  }

  @Public()
  @Get('packages')
  @ApiOperation({ summary: 'Get all plant packages' })
  @ApiResponse({ status: 200, description: 'List of plant packages' })
  findAllPackages() {
    return this.plantsService.findAllPackages();
  }

  @Public()
  @Get('packages/popular')
  @ApiOperation({ summary: 'Get popular plant packages' })
  @ApiResponse({ status: 200, description: 'List of popular packages' })
  findPopularPackages() {
    return this.plantsService.findPopularPackages();
  }

  @Public()
  @Get('packages/:id')
  @ApiOperation({ summary: 'Get plant package by ID' })
  @ApiResponse({ status: 200, description: 'Plant package found' })
  findPackageById(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.findPackageById(id);
  }

  @Patch('packages/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update plant package (Admin only)' })
  @ApiResponse({ status: 200, description: 'Package updated successfully' })
  updatePackage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePackageDto: UpdatePlantPackageDto,
  ) {
    return this.plantsService.updatePackage(id, updatePackageDto);
  }

  @Delete('packages/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete plant package (Admin only)' })
  @ApiResponse({ status: 200, description: 'Package deleted successfully' })
  deletePackage(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.deletePackage(id);
  }

  @Post('packages/:id/image')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image', { storage: packageStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload package image (Admin only)' })
  uploadPackageImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.plantsService.uploadPackageImage(id, file);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';
import { UserRole } from '@modules/users/types/user-role.enum';

@ApiTags('Admin')
@ApiBearerAuth('JWT')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics' })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('recent-users')
  @ApiOperation({ summary: 'Get recent users' })
  @ApiResponse({ status: 200, description: 'List of recent users' })
  getRecentUsers() {
    return this.adminService.getRecentUsers();
  }

  @Get('system-health')
  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({ status: 200, description: 'System health information' })
  getSystemHealth() {
    return this.adminService.getSystemHealth();
  }
}
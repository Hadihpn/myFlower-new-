import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionsService } from './user-actions.service';
import { UserActionsController } from './user-actions.controller';
import { UserAction } from './entities/user-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAction])],
  controllers: [UserActionsController],
  providers: [UserActionsService],
  exports: [UserActionsService],
})
export class UserActionsModule {}

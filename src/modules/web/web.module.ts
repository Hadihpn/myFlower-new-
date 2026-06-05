import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module'; // اگر برای پروفایل لازم است
import { WebController } from './web.controller';

@Module({
  imports: [UsersModule],
  controllers: [WebController],
})
export class WebModule {}

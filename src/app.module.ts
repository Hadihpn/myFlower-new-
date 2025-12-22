import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PlantsModule } from './modules/plants/plants.module';
import { DevicesModule } from './modules/devices/devices.module';
import { SensorReadingsModule } from './modules/sensor-readings/sensor-readings.module';
import { SensorVerificationModule } from './modules/sensor-verification/sensor-verification.module';
import { UserPlantSelectionsModule } from './modules/user-plant-selections/user-plant-selections.module';
import { AdviceModule } from './modules/advice/advice.module';
import { UserActionsModule } from './modules/user-actions/user-actions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';
import { DailySummaryModule } from './modules/daily-summary/daily-summary.module';

@Module({
  imports: [AuthModule, UsersModule, SubscriptionModule, PaymentModule, PlantsModule, DevicesModule, SensorReadingsModule, SensorVerificationModule, UserPlantSelectionsModule, AdviceModule, UserActionsModule, NotificationsModule, AdminModule, DailySummaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

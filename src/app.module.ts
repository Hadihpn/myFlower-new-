import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import all modules
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

// Guards
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize'),
        logging: configService.get('database.logging'),
      }),
      inject: [ConfigService],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ([{
        ttl: configService.get('throttle.ttl'),
        limit: configService.get('throttle.limit'),
      }]),
      inject: [ConfigService],
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    SubscriptionModule,
    PaymentModule,
    PlantsModule,
    DevicesModule,
    SensorReadingsModule,
    SensorVerificationModule,
    UserPlantSelectionsModule,
    AdviceModule,
    UserActionsModule,
    NotificationsModule,
    AdminModule,
    DailySummaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}


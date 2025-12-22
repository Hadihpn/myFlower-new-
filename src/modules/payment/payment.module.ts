import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { UsersModule } from '@modules/users/users.module';
import { ZarinpalService } from './zrinpal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    SubscriptionModule,
    UsersModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ZarinpalService],
  exports: [PaymentService],
})
export class PaymentModule {}

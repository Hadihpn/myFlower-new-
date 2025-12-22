import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Redirect,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/payment-request.dto';
import { PaymentVerifyDto } from './dto/payment-verify.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Payment')
@ApiBearerAuth('JWT')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('request')
  @ApiOperation({ summary: 'Create payment request' })
  @ApiResponse({ status: 201, description: 'Payment URL generated' })
  async createPayment(
    @CurrentUser('id') userId: number,
    @Body() paymentRequestDto: PaymentRequestDto,
  ) {
    return this.paymentService.createPaymentRequest(userId, paymentRequestDto);
  }

  @Public()
  @Get('verify')
  @ApiOperation({ summary: 'Verify payment (callback from ZarinPal)' })
  @ApiResponse({ status: 200, description: 'Payment verified' })
  async verifyPayment(
    @Query('Authority') authority: string,
    @Query('Status') status: string,
  ) {
    const result = await this.paymentService.verifyPayment(authority, status);

    // In production, redirect to frontend with result
    if (result.success) {
      return {
        success: true,
        message: 'Payment successful',
        refId: result.refId,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  }

  @Get('my-payments')
  @ApiOperation({ summary: 'Get user payment history' })
  @ApiResponse({ status: 200, description: 'List of payments' })
  getUserPayments(@CurrentUser('id') userId: number) {
    return this.paymentService.getUserPayments(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment details' })
  getPaymentById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getPaymentById(id);
  }
}

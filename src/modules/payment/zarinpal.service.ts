import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  ZarinpalRequestResponse,
  ZarinpalVerifyResponse,
} from './interfaces/zarinpal.interface';

@Injectable()
export class ZarinpalService {
  private readonly merchantId: string;
  private readonly sandbox: boolean;
  private readonly callbackUrl: string;
  private readonly requestUrl: string;
  private readonly verifyUrl: string;
  private readonly paymentGatewayUrl: string;

  constructor(private configService: ConfigService) {
    this.merchantId = this.configService.get<string>('zarinpal.merchantId');
    this.sandbox = this.configService.get<boolean>('zarinpal.sandbox');
    this.callbackUrl = this.configService.get<string>('zarinpal.callbackUrl');

    // ZarinPal URLs
    const baseUrl = this.sandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://api.zarinpal.com/pg/v4/payment';

    const gatewayUrl = this.sandbox
      ? 'https://sandbox.zarinpal.com/pg/StartPay'
      : 'https://www.zarinpal.com/pg/StartPay';

    this.requestUrl = `${baseUrl}/request.json`;
    this.verifyUrl = `${baseUrl}/verify.json`;
    this.paymentGatewayUrl = gatewayUrl;
  }

  async requestPayment(
    amount: number,
    description: string,
    email?: string,
    mobile?: string,
  ): Promise<{ authority: string; paymentUrl: string }> {
    try {
      console.log("requestUrl",this.requestUrl )
      console.log("metadata",{
          merchant_id: this.merchantId,
          amount: amount * 10, // Convert to Rials (Toman * 10)
          description,
          callback_url: this.callbackUrl,
          metadata: {
            email: email || '',
            mobile: mobile || '',
          },
        }, )
      const response = await axios.post<ZarinpalRequestResponse>(
        this.requestUrl,
        {
          merchant_id: this.merchantId,
          amount: amount * 10, // Convert to Rials (Toman * 10)
          description,
          callback_url: this.callbackUrl,
          metadata: {
            email: email || '',
            mobile: mobile || '',
          },
        },
      );
      console.log("response",response);

      if (response.data.data.code !== 100) {
        throw new BadRequestException(
          `ZarinPal Error: ${response.data.data.message}`,
        );
      }

      const authority = response.data.data.authority;
      const paymentUrl = `${this.paymentGatewayUrl}/${authority}`;

      return { authority, paymentUrl };
    } catch (error) {
      if (error.response?.data?.errors) {
        throw new BadRequestException(
          `Payment request failed: ${JSON.stringify(error.response.data.errors)}`,
        );
      }
      throw new BadRequestException('Payment request failed');
    }
  }

  async verifyPayment(
    authority: string,
    amount: number,
  ): Promise<ZarinpalVerifyResponse['data']> {
    try {
      const response = await axios.post<ZarinpalVerifyResponse>(
        this.verifyUrl,
        {
          merchant_id: this.merchantId,
          amount: amount * 10, // Convert to Rials
          authority,
        },
      );

      if (response.data.data.code !== 100 && response.data.data.code !== 101) {
        throw new BadRequestException(
          `Payment verification failed: ${response.data.data.message}`,
        );
      }

      return response.data.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        throw new BadRequestException(
          `Payment verification failed: ${JSON.stringify(error.response.data.errors)}`,
        );
      }
      throw new BadRequestException('Payment verification failed');
    }
  }
}
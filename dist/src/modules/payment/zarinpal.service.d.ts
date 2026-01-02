import { ConfigService } from '@nestjs/config';
import { ZarinpalVerifyResponse } from './interfaces/zarinpal.interface';
export declare class ZarinpalService {
    private configService;
    private readonly merchantId;
    private readonly sandbox;
    private readonly callbackUrl;
    private readonly requestUrl;
    private readonly verifyUrl;
    private readonly paymentGatewayUrl;
    constructor(configService: ConfigService);
    requestPayment(amount: number, description: string, email?: string, mobile?: string): Promise<{
        authority: string;
        paymentUrl: string;
    }>;
    verifyPayment(authority: string, amount: number): Promise<ZarinpalVerifyResponse['data']>;
}

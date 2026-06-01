"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZarinpalService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let ZarinpalService = class ZarinpalService {
    constructor(configService) {
        this.configService = configService;
        this.merchantId = this.configService.get('zarinpal.merchantId');
        this.sandbox = this.configService.get('zarinpal.sandbox');
        this.callbackUrl = this.configService.get('zarinpal.callbackUrl');
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
    async requestPayment(amount, description, email, mobile) {
        try {
            console.log("requestUrl", this.requestUrl);
            console.log("metadata", {
                merchant_id: this.merchantId,
                amount: amount * 10,
                description,
                callback_url: this.callbackUrl,
                metadata: {
                    email: email || '',
                    mobile: mobile || '',
                },
            });
            const response = await axios_1.default.post(this.requestUrl, {
                merchant_id: this.merchantId,
                amount: amount * 10,
                description,
                callback_url: this.callbackUrl,
                metadata: {
                    email: email || '',
                    mobile: mobile || '',
                },
            });
            console.log("response", response);
            if (response.data.data.code !== 100) {
                throw new common_1.BadRequestException(`ZarinPal Error: ${response.data.data.message}`);
            }
            const authority = response.data.data.authority;
            const paymentUrl = `${this.paymentGatewayUrl}/${authority}`;
            return { authority, paymentUrl };
        }
        catch (error) {
            if (error.response?.data?.errors) {
                throw new common_1.BadRequestException(`Payment request failed: ${JSON.stringify(error.response.data.errors)}`);
            }
            throw new common_1.BadRequestException('Payment request failed');
        }
    }
    async verifyPayment(authority, amount) {
        try {
            const response = await axios_1.default.post(this.verifyUrl, {
                merchant_id: this.merchantId,
                amount: amount * 10,
                authority,
            });
            if (response.data.data.code !== 100 && response.data.data.code !== 101) {
                throw new common_1.BadRequestException(`Payment verification failed: ${response.data.data.message}`);
            }
            return response.data.data;
        }
        catch (error) {
            if (error.response?.data?.errors) {
                throw new common_1.BadRequestException(`Payment verification failed: ${JSON.stringify(error.response.data.errors)}`);
            }
            throw new common_1.BadRequestException('Payment verification failed');
        }
    }
};
exports.ZarinpalService = ZarinpalService;
exports.ZarinpalService = ZarinpalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ZarinpalService);
//# sourceMappingURL=zarinpal.service.js.map
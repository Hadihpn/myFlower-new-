import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendSuddenChangeAlert(deviceId: number, changeType: string, magnitude: number): Promise<void>;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendThresholdAlert(email: string, name: string, messages: string[]): Promise<void>;
}

import { VerificationStatus } from '../types/verification-status.enum';
import { ChangeType } from '../types/change-type.enum';
import { Confidence } from '../types/confidence.enum';
export declare class VerificationResponseDto {
    id: number;
    deviceId: number;
    triggerReadingId: number;
    status: VerificationStatus;
    changeType: ChangeType;
    changeMagnitude: number;
    verificationReadings: any[];
    confirmed: boolean;
    confidence: Confidence;
    requestedAt: Date;
    completedAt: Date;
    expiresAt: Date;
}

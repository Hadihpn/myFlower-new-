import { SensorVerificationService } from './sensor-verification.service';
export declare class SensorVerificationController {
    private readonly verificationService;
    constructor(verificationService: SensorVerificationService);
    getPendingVerifications(deviceId: number): Promise<import("./entities/sensor-verification.entity").SensorVerification[]>;
    getVerificationHistory(deviceId: number): Promise<import("./entities/sensor-verification.entity").SensorVerification[]>;
}

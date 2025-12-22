import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { SensorVerification } from './entities/sensor-verification.entity';
import { VerificationStatus } from './types/verification-status.enum';
import { ChangeType } from './types/change-type.enum';
import { Confidence } from './types/confidence.enum';
import { ConfigService } from '@nestjs/config';
import { DateUtil } from '@common/utils/date.util';
import { NotificationsService } from '@modules/notifications/notifications.service';

@Injectable()
export class SensorVerificationService {
  private readonly verificationTimeoutMinutes: number;

  constructor(
    @InjectRepository(SensorVerification)
    private verificationRepository: Repository<SensorVerification>,
    private configService: ConfigService,
    private notificationsService: NotificationsService,
  ) {
    this.verificationTimeoutMinutes = this.configService.get<number>(
      'sensor.verificationTimeout',
    );
  }

  async createVerification(
    deviceId: number,
    triggerReadingId: number,
    changeType: string,
    changeMagnitude: number,
  ): Promise<SensorVerification> {
    const now = new Date();
    const expiresAt = DateUtil.addMinutes(now, this.verificationTimeoutMinutes);

    const verification = this.verificationRepository.create({
      deviceId,
      triggerReadingId,
      status: VerificationStatus.PENDING,
      changeType: changeType as ChangeType,
      changeMagnitude,
      verificationReadings: [],
      requestedAt: now,
      expiresAt,
    });

    return this.verificationRepository.save(verification);
  }

  async addVerificationReading(
    deviceId: number,
    reading: any,
  ): Promise<void> {
    // Find pending verifications for this device
    const pendingVerifications = await this.verificationRepository.find({
      where: {
        deviceId,
        status: VerificationStatus.PENDING,
      },
      order: { requestedAt: 'ASC' },
    });

    for (const verification of pendingVerifications) {
      // Add reading to verification
      verification.verificationReadings.push({
        temperature: reading.temperature,
        moisture: reading.moisture,
        light: reading.light,
        timestamp: reading.timestamp,
      });

      // Check if we have enough readings (3 total: 1 trigger + 2 verification)
      if (verification.verificationReadings.length >= 2) {
        await this.completeVerification(verification);
      } else {
        await this.verificationRepository.save(verification);
      }
    }
  }

  private async completeVerification(
    verification: SensorVerification,
  ): Promise<void> {
    verification.status = VerificationStatus.COMPLETED;
    verification.completedAt = new Date();

    // Analyze readings to determine if change is real or sensor glitch
    const analysis = this.analyzeReadings(verification);

    verification.confirmed = analysis.confirmed;
    verification.confidence = analysis.confidence;

    await this.verificationRepository.save(verification);

    // Send notification if confirmed as real change
    if (verification.confirmed) {
      await this.notificationsService.sendSuddenChangeAlert(
        verification.deviceId,
        verification.changeType,
        verification.changeMagnitude,
      );
    }
  }

  private analyzeReadings(verification: SensorVerification): {
    confirmed: boolean;
    confidence: Confidence;
  } {
    const readings = verification.verificationReadings;

    if (readings.length < 2) {
      return { confirmed: false, confidence: Confidence.LOW };
    }

    // Determine which metric changed based on changeType
    let metricKey: string;
    if (verification.changeType.includes('temperature')) {
      metricKey = 'temperature';
    } else if (verification.changeType.includes('moisture')) {
      metricKey = 'moisture';
    } else {
      metricKey = 'light';
    }

    // Check if subsequent readings confirm the change
    const values = readings.map((r) => r[metricKey]);
    const avgValue = values.reduce((a, b) => a + b, 0) / values.length;

    // Calculate consistency (standard deviation)
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - avgValue, 2), 0) /
      values.length;
    const stdDev = Math.sqrt(variance);

    // Determine confidence based on consistency
    let confidence: Confidence;
    if (stdDev < 2) {
      confidence = Confidence.HIGH;
    } else if (stdDev < 5) {
      confidence = Confidence.MEDIUM;
    } else {
      confidence = Confidence.LOW;
    }

    // Confirmed if readings are consistent (low standard deviation)
    const confirmed = stdDev < 5;

    return { confirmed, confidence };
  }

  async getPendingVerifications(deviceId: number): Promise<SensorVerification[]> {
    return this.verificationRepository.find({
      where: {
        deviceId,
        status: VerificationStatus.PENDING,
      },
      order: { requestedAt: 'ASC' },
    });
  }

  async expireOldVerifications(): Promise<void> {
    const now = new Date();

    const expiredVerifications = await this.verificationRepository.find({
      where: {
        status: VerificationStatus.PENDING,
        expiresAt: LessThan(now),
      },
    });

    for (const verification of expiredVerifications) {
      verification.status = VerificationStatus.EXPIRED;
      verification.confirmed = false;
      verification.confidence = Confidence.LOW;
      await this.verificationRepository.save(verification);
    }
  }

  async getDeviceVerificationHistory(
    deviceId: number,
  ): Promise<SensorVerification[]> {
    return this.verificationRepository.find({
      where: { deviceId },
      order: { requestedAt: 'DESC' },
      take: 50,
    });
  }
}

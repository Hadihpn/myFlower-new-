// sensor-readings.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SelectQueryBuilder } from 'typeorm';

import { SensorReadingsService } from './sensor-readings.service';
import { SensorReading } from './entities/sensor-reading.entity';
import { DevicesService } from '@modules/devices/devices.service';
import { SensorVerificationService } from '@modules/sensor-verification/sensor-verification.service';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { NotificationsService } from '../notifications/notifications.service';

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Builds a minimal SensorReading object for use in tests */
function makeReading(overrides: Partial<SensorReading> = {}): SensorReading {
  return {
    id: 1,
    deviceId: 10,
    temperature: 25,
    moisture: 50,
    light: 1000,
    humidity: 60,
    timestamp: new Date('2024-01-01T12:00:00Z'),
    verified: true,
    anomaly: false,
    ...overrides,
  } as SensorReading;
}

/** Creates a chainable QueryBuilder mock whose terminal call resolves to `result` */
function makeQB(result: SensorReading | null): jest.Mocked<SelectQueryBuilder<SensorReading>> {
  const qb = {
    where: jest.fn(),
    andWhere: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    select: jest.fn(),
    addSelect: jest.fn(),
    getOne: jest.fn().mockResolvedValue(result),
    getMany: jest.fn().mockResolvedValue([]),
    getRawOne: jest.fn().mockResolvedValue(null),
  } as unknown as jest.Mocked<SelectQueryBuilder<SensorReading>>;

  // Make every builder method return the same mock (fluent chaining)
  (Object.keys(qb) as (keyof typeof qb)[]).forEach((k) => {
    if (k !== 'getOne' && k !== 'getMany' && k !== 'getRawOne') {
      (qb[k] as jest.Mock).mockReturnValue(qb);
    }
  });

  return qb;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCKS
// ─────────────────────────────────────────────────────────────────────────────

const mockDevice = {
  id: 10,
  userId: 99,
  calibration: null,
};

const mockReadingRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(),
};

const mockDevicesService = {
  findDeviceByDeviceId: jest.fn(),
  updateLastSeen: jest.fn(),
};

const mockVerificationService = {
  createVerification: jest.fn(),
};

const mockUserPlantSelectionsService = {
  getCurrentlyMonitored: jest.fn(),
};

const mockNotificationsService = {
  sendThresholdAlert: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    const map: Record<string, number> = {
      'sensor.suddenChange.temperature': 5,
      'sensor.suddenChange.moisture': 20,
      'sensor.suddenChange.light': 300,
    };
    return map[key] ?? null;
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE
// ─────────────────────────────────────────────────────────────────────────────

describe('SensorReadingsService', () => {
  let service: SensorReadingsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorReadingsService,
        { provide: getRepositoryToken(SensorReading), useValue: mockReadingRepository },
        { provide: DevicesService,                    useValue: mockDevicesService },
        { provide: SensorVerificationService,         useValue: mockVerificationService },
        { provide: UserPlantSelectionsService,        useValue: mockUserPlantSelectionsService },
        { provide: NotificationsService,              useValue: mockNotificationsService },
        { provide: ConfigService,                     useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<SensorReadingsService>(SensorReadingsService);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // createReading
  // ───────────────────────────────────────────────────────────────────────────

  describe('createReading', () => {
    const dto = { temperature: 25, moisture: 50, light: 1000, humidity: 60 };

    it('throws NotFoundException when device is not found', async () => {
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(null);

      await expect(service.createReading('unknown-device', dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('persists the reading and returns it', async () => {
      const savedReading = makeReading();
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      const result = await service.createReading('device-abc', dto);

      expect(result).toBe(savedReading);
      expect(mockReadingRepository.save).toHaveBeenCalledTimes(1);
    });

    it('calls updateLastSeen after saving', async () => {
      const savedReading = makeReading();
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', dto);

      expect(mockDevicesService.updateLastSeen).toHaveBeenCalledWith('device-abc');
    });

    it('applies calibration offsets before saving', async () => {
      const deviceWithCalibration = {
        ...mockDevice,
        calibration: { temperatureOffset: 2, moistureOffset: -5, lightOffset: 100 },
      };
      const savedReading = makeReading();
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(deviceWithCalibration);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', dto);

      // create() must receive calibration-adjusted values
      expect(mockReadingRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 27,   // 25 + 2
          moisture:    45,   // 50 - 5
          light:      1100,  // 1000 + 100
        }),
      );
    });

    it('uses provided timestamp when given', async () => {
      const ts = '2024-06-15T08:30:00Z';
      const savedReading = makeReading({ timestamp: new Date(ts) });
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', { ...dto, timestamp: ts });

      expect(mockReadingRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ timestamp: new Date(ts) }),
      );
    });

    it('falls back to current time when no timestamp is provided', async () => {
      const before = new Date();
      const savedReading = makeReading();
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', dto);
      const after = new Date();

      const [[callArg]] = mockReadingRepository.create.mock.calls;
      expect(callArg.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(callArg.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('marks the saved reading as verified: true', async () => {
      const savedReading = makeReading();
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(savedReading);
      mockReadingRepository.save.mockResolvedValue(savedReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', dto);

      expect(mockReadingRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ verified: true }),
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // getLatestReading
  // ───────────────────────────────────────────────────────────────────────────

  describe('getLatestReading', () => {
    it('returns the most recent reading', async () => {
      const reading = makeReading();
      mockReadingRepository.findOne.mockResolvedValue(reading);

      const result = await service.getLatestReading(10);

      expect(result).toBe(reading);
      expect(mockReadingRepository.findOne).toHaveBeenCalledWith({
        where: { deviceId: 10 },
        order: { timestamp: 'DESC' },
      });
    });

    it('returns null when no reading exists', async () => {
      mockReadingRepository.findOne.mockResolvedValue(null);

      const result = await service.getLatestReading(10);

      expect(result).toBeNull();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // getDeviceReadings
  // ───────────────────────────────────────────────────────────────────────────

  describe('getDeviceReadings', () => {
    it('returns readings without date filters', async () => {
      const readings = [makeReading()];
      const qb = makeQB(null);
      (qb.getMany as jest.Mock).mockResolvedValue(readings);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      const result = await service.getDeviceReadings(10, { limit: 10 });

      expect(result).toBe(readings);
      expect(qb.where).toHaveBeenCalledWith('reading.deviceId = :deviceId', { deviceId: 10 });
      expect(qb.orderBy).toHaveBeenCalledWith('reading.timestamp', 'DESC');
      expect(qb.limit).toHaveBeenCalledWith(10);
    });

    it('adds startDate filter when provided', async () => {
      const qb = makeQB(null);
      (qb.getMany as jest.Mock).mockResolvedValue([]);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      await service.getDeviceReadings(10, { startDate: '2024-01-01' });

      expect(qb.andWhere).toHaveBeenCalledWith(
        'reading.timestamp >= :startDate',
        expect.objectContaining({ startDate: new Date('2024-01-01') }),
      );
    });

    it('adds endDate filter when provided', async () => {
      const qb = makeQB(null);
      (qb.getMany as jest.Mock).mockResolvedValue([]);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      await service.getDeviceReadings(10, { endDate: '2024-12-31' });

      expect(qb.andWhere).toHaveBeenCalledWith(
        'reading.timestamp <= :endDate',
        expect.objectContaining({ endDate: new Date('2024-12-31') }),
      );
    });

    it('defaults limit to 100 when not supplied', async () => {
      const qb = makeQB(null);
      (qb.getMany as jest.Mock).mockResolvedValue([]);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      await service.getDeviceReadings(10, {});

      expect(qb.limit).toHaveBeenCalledWith(100);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // getAverageReadings
  // ───────────────────────────────────────────────────────────────────────────

  describe('getAverageReadings', () => {
    const start = new Date('2024-01-01');
    const end   = new Date('2024-01-31');

    it('returns parsed averages from getRawOne', async () => {
      const qb = makeQB(null);
      (qb.getRawOne as jest.Mock).mockResolvedValue({
        avgTemperature: '22.50',
        avgMoisture:    '55.00',
        avgLight:       '800.00',
        avgHumidity:    '65.00',
      });
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      const result = await service.getAverageReadings(10, start, end);

      expect(result).toEqual({
        avgTemperature: 22.5,
        avgMoisture:    55,
        avgLight:       800,
        avgHumidity:    65,
      });
    });

    it('returns zeros when getRawOne returns null', async () => {
      const qb = makeQB(null);
      (qb.getRawOne as jest.Mock).mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      const result = await service.getAverageReadings(10, start, end);

      expect(result).toEqual({
        avgTemperature: 0,
        avgMoisture:    0,
        avgLight:       0,
        avgHumidity:    0,
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // getDailyStats
  // ───────────────────────────────────────────────────────────────────────────

  describe('getDailyStats', () => {
    const targetDate = new Date('2024-06-15');

    it('returns parsed daily stats', async () => {
      const qb = makeQB(null);
      (qb.getRawOne as jest.Mock).mockResolvedValue({
        minTemperature: '18.00', maxTemperature: '30.00', avgTemperature: '24.00',
        minMoisture:    '40.00', maxMoisture:    '70.00', avgMoisture:    '55.00',
        minLight:       '200.0', maxLight:       '1500.0',avgLight:       '900.0',
      });
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      const result = await service.getDailyStats(10, targetDate);

      expect(result).toEqual({
        minTemperature: 18, maxTemperature: 30, avgTemperature: 24,
        minMoisture:    40, maxMoisture:    70, avgMoisture:    55,
        minLight:       200,maxLight:       1500,avgLight:      900,
      });
    });

    it('returns zeros when getRawOne returns null', async () => {
      const qb = makeQB(null);
      (qb.getRawOne as jest.Mock).mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      const result = await service.getDailyStats(10, targetDate);

      expect(result).toEqual({
        minTemperature: 0, maxTemperature: 0, avgTemperature: 0,
        minMoisture:    0, maxMoisture:    0, avgMoisture:    0,
        minLight:       0, maxLight:       0, avgLight:       0,
      });
    });

    it('queries correct start-of-day and end-of-day boundaries', async () => {
      const qb = makeQB(null);
      (qb.getRawOne as jest.Mock).mockResolvedValue(null);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      await service.getDailyStats(10, targetDate);

      const expectedStart = new Date('2024-06-15'); expectedStart.setHours(0,  0,  0,   0);
      const expectedEnd   = new Date('2024-06-15'); expectedEnd.setHours(23, 59, 59, 999);

      expect(qb.andWhere).toHaveBeenCalledWith(
        'reading.timestamp BETWEEN :startOfDay AND :endOfDay',
        { startOfDay: expectedStart, endOfDay: expectedEnd },
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // checkSuddenChanges  (tested indirectly via createReading)
  // ───────────────────────────────────────────────────────────────────────────

  describe('checkSuddenChanges', () => {
    /** Wires up createReading so the QBuilder returns `previousReading`. */
    async function triggerWithPrevious(
      currentReading: SensorReading,
      previousReading: SensorReading | null,
    ) {
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(currentReading);
      mockReadingRepository.save.mockResolvedValue(currentReading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(null);

      const qb = makeQB(previousReading);
      mockReadingRepository.createQueryBuilder.mockReturnValue(qb);

      await service.createReading('device-abc', {
        temperature: currentReading.temperature,
        moisture:    currentReading.moisture,
        light:       currentReading.light,
      });
    }

    it('does NOT create a verification when there is no previous reading', async () => {
      await triggerWithPrevious(makeReading(), null);

      expect(mockVerificationService.createVerification).not.toHaveBeenCalled();
    });

    it('creates a temperature_change verification when delta ≥ threshold (5)', async () => {
      const current  = makeReading({ temperature: 30 });
      const previous = makeReading({ temperature: 24 }); // delta = 6 ≥ 5

      await triggerWithPrevious(current, previous);

      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id,
        current.id,
        'temperature_change',
        6,
      );
    });

    it('does NOT create temperature verification when delta < threshold', async () => {
      const current  = makeReading({ temperature: 25 });
      const previous = makeReading({ temperature: 28 }); // delta = 3 < 5

      await triggerWithPrevious(current, previous);

      expect(mockVerificationService.createVerification).not.toHaveBeenCalledWith(
        expect.anything(), expect.anything(), 'temperature_change', expect.anything(),
      );
    });

    it('creates a moisture_change verification when delta ≥ threshold (20)', async () => {
      const current  = makeReading({ moisture: 80 });
      const previous = makeReading({ moisture: 55 }); // delta = 25 ≥ 20

      await triggerWithPrevious(current, previous);

      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id,
        current.id,
        'moisture_change',
        25,
      );
    });

    it('creates a light_change verification when delta ≥ threshold (300)', async () => {
      const current  = makeReading({ light: 1400 });
      const previous = makeReading({ light: 1000 }); // delta = 400 ≥ 300

      await triggerWithPrevious(current, previous);

      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id,
        current.id,
        'light_change',
        400,
      );
    });

    it('fires verifications for every channel that exceeds its threshold', async () => {
      const current  = makeReading({ temperature: 35, moisture: 80, light: 1500 });
      const previous = makeReading({ temperature: 20, moisture: 50, light: 1000 });
      //                             delta = 15 ≥ 5   delta = 30 ≥ 20  delta = 500 ≥ 300

      await triggerWithPrevious(current, previous);

      expect(mockVerificationService.createVerification).toHaveBeenCalledTimes(3);
      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id, current.id, 'temperature_change', 15,
      );
      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id, current.id, 'moisture_change', 30,
      );
      expect(mockVerificationService.createVerification).toHaveBeenCalledWith(
        mockDevice.id, current.id, 'light_change', 500,
      );
    });

    it('does not throw even if createVerification rejects (error is swallowed)', async () => {
      mockVerificationService.createVerification.mockRejectedValue(new Error('DB error'));
      const current  = makeReading({ temperature: 35 });
      const previous = makeReading({ temperature: 20 });

      // Should resolve without throwing
      await expect(triggerWithPrevious(current, previous)).resolves.not.toThrow();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // checkPlantThresholds  (tested indirectly via createReading)
  // ───────────────────────────────────────────────────────────────────────────

  describe('checkPlantThresholds', () => {
    async function triggerWithSelection(
      reading: SensorReading,
      selection: object | null,
    ) {
      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockReadingRepository.create.mockReturnValue(reading);
      mockReadingRepository.save.mockResolvedValue(reading);
      mockUserPlantSelectionsService.getCurrentlyMonitored.mockResolvedValue(selection);
      mockReadingRepository.createQueryBuilder.mockReturnValue(makeQB(null));

      await service.createReading('device-abc', {
        temperature: reading.temperature,
        moisture:    reading.moisture,
        light:       reading.light,
      });
    }

    it('does nothing when no plant selection exists', async () => {
      await triggerWithSelection(makeReading(), null);

      expect(mockNotificationsService.sendThresholdAlert).not.toHaveBeenCalled();
    });

    it('does nothing when selection has no thresholds', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: null,
      };
      await triggerWithSelection(makeReading(), selection);

      expect(mockNotificationsService.sendThresholdAlert).not.toHaveBeenCalled();
    });

    it('does not alert when all readings are within thresholds', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: {
            temperature: { min: 15, max: 35 },
            moisture:    { min: 30, max: 80 },
            light:       { min: 200, max: 2000 },
          },
        },
      };
      // Reading well inside all thresholds
      await triggerWithSelection(makeReading({ temperature: 25, moisture: 50, light: 1000 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).not.toHaveBeenCalled();
    });

    it('sends alert when temperature is below minimum', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: {
            temperature: { min: 18, max: 35 },
          },
        },
      };
      await triggerWithSelection(makeReading({ temperature: 10 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalledWith(
        'user@test.com',
        'Test User',
        expect.arrayContaining([expect.stringContaining('Temperature too low')]),
      );
    });

    it('sends alert when temperature is above maximum', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: { temperature: { min: 10, max: 30 } },
        },
      };
      await triggerWithSelection(makeReading({ temperature: 40 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalledWith(
        'user@test.com',
        'Test User',
        expect.arrayContaining([expect.stringContaining('Temperature too high')]),
      );
    });

    it('sends alert when moisture is below minimum', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: { moisture: { min: 40, max: 80 } },
        },
      };
      await triggerWithSelection(makeReading({ moisture: 20 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalledWith(
        'user@test.com',
        'Test User',
        expect.arrayContaining([expect.stringContaining('Soil moisture too low')]),
      );
    });

    it('sends alert when light is above maximum', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: { light: { min: 100, max: 1000 } },
        },
      };
      await triggerWithSelection(makeReading({ light: 2000 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalledWith(
        'user@test.com',
        'Test User',
        expect.arrayContaining([expect.stringContaining('Light level too high')]),
      );
    });

    it('batches multiple threshold violations into one alert call', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: null,
        plantSpecies: {
          thresholds: {
            temperature: { min: 18, max: 30 },
            moisture:    { min: 40, max: 80 },
            light:       { min: 200, max: 1000 },
          },
        },
      };
      // All three out of range simultaneously
      await triggerWithSelection(
        makeReading({ temperature: 5, moisture: 10, light: 5000 }),
        selection,
      );

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalledTimes(1);
      const [, , messages] = mockNotificationsService.sendThresholdAlert.mock.calls[0];
      expect(messages).toHaveLength(3);
    });

    it('prefers package thresholds over species thresholds', async () => {
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test User' },
        package: {
          thresholds: { temperature: { min: 20, max: 25 } }, // tight window
        },
        plantSpecies: {
          thresholds: { temperature: { min: 0, max: 100 } }, // wide window
        },
      };
      // 26°C is fine for species but outside package range
      await triggerWithSelection(makeReading({ temperature: 26 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).toHaveBeenCalled();
    });

    it('does not alert when user email is missing', async () => {
      const selection = {
        user: { fullName: 'No Email User' }, // no email field
        package: null,
        plantSpecies: {
          thresholds: { temperature: { min: 18, max: 30 } },
        },
      };
      await triggerWithSelection(makeReading({ temperature: 5 }), selection);

      expect(mockNotificationsService.sendThresholdAlert).not.toHaveBeenCalled();
    });

    it('does not throw when sendThresholdAlert rejects (error is swallowed)', async () => {
      mockNotificationsService.sendThresholdAlert.mockRejectedValue(new Error('SMTP failure'));
      const selection = {
        user: { email: 'user@test.com', fullName: 'Test' },
        package: null,
        plantSpecies: { thresholds: { temperature: { min: 30, max: 35 } } },
      };

      await expect(
        triggerWithSelection(makeReading({ temperature: 5 }), selection),
      ).resolves.not.toThrow();
    });
  });
});

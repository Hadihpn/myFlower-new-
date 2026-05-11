// src/care-schedules/care-schedule.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CareSchedule, CareScheduleStatus, CareTaskType } from './entities/care-schedules.entity';
import { DevicesService } from '../devices/devices.service';
import { CarePlan, CarePlanStatus } from '../care-plan/entities/care-plan.entity';

@Injectable()
export class CareScheduleService {
  constructor(
    @InjectRepository(CareSchedule)
    private readonly careScheduleRepository: Repository<CareSchedule>,
    @InjectRepository(CarePlan)
    private readonly carePlanRepository: Repository<CarePlan>,
    private readonly devicesService: DevicesService,
  ) {}

  /**
   * دریافت تسک‌های آینده برای یک دستگاه
   */
  async getUpcomingTasks(userId: number, deviceId: string) {
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);
    if (!device) throw new NotFoundException('Device not found');
    if (device.userId !== userId) throw new NotFoundException('Access denied');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.careScheduleRepository.find({
      where: {
        userId,
        deviceId: device.deviceId,
        scheduledAt: MoreThanOrEqual(today),
        status: CareScheduleStatus.PENDING,
      },
      order: { scheduledAt: 'ASC' },
      take: 30,
    });
  }

  /**
   * تکمیل یک تسک
   */
  async completeTask(userId: number, taskId: string, notes?: string) {
    const task = await this.careScheduleRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) throw new NotFoundException('Task not found');

    task.status = CareScheduleStatus.COMPLETED;
    task.completedAt = new Date();
    if (notes) task.notes = notes;

    return this.careScheduleRepository.save(task);
  }

  /**
   * رد کردن (Skip) یک تسک
   */
  async skipTask(userId: number, taskId: string, reason?: string) {
    const task = await this.careScheduleRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) throw new NotFoundException('Task not found');

    task.status = CareScheduleStatus.SKIPPED;
    if (reason) task.reason = reason;

    await this.careScheduleRepository.save(task);

    // ✅ افزایش skipCount در CarePlan
    if (task.carePlanId) {
      await this.incrementSkipCount(task.carePlanId);
    }

    return task;
  }

  /**
   * افزایش شمارنده skip در CarePlan
   */
  private async incrementSkipCount(carePlanId: string) {
    const carePlan = await this.carePlanRepository.findOne({
      where: { id: carePlanId, status: CarePlanStatus.ACTIVE },
    });

    if (!carePlan) return;

    carePlan.skipCount += 1;
    await this.carePlanRepository.save(carePlan);

    // ✅ اگر skipCount >= 3 شد، باید CarePlan جدید تولید شود
    if (carePlan.skipCount >= 3) {
      // TODO: فراخوانی سرویس تولید CarePlan جدید
      // await this.carePlanService.regenerateCarePlan(carePlan);
    }
  }

  /**
   * تولید CareSchedule‌ها بر اساس یک CarePlan
   * (این متد توسط Cron Job یا CarePlanService فراخوانی می‌شود)
   */
  async generateSchedulesFromCarePlan(
    carePlan: CarePlan,
    startDate: Date,  
    durationDays: number,
  ): Promise<CareSchedule[]> {
    const schedules: CareSchedule[] = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    // ۱. تولید تسک‌های آبیاری
    for (let day = 0; day < durationDays; day += carePlan.wateringFrequencyDays) {
      const scheduledAt = new Date(startDate);
      scheduledAt.setDate(scheduledAt.getDate() + day);

      schedules.push(
        this.careScheduleRepository.create({
          userId: carePlan.userId,
          deviceId: carePlan.deviceId,
          plantSpeciesId: carePlan.plantSpeciesId,
          carePlanId: carePlan.id,
          taskType: CareTaskType.WATERING,
          scheduledAt,
          status: CareScheduleStatus.PENDING,
        }),
      );
    }

    // ۲. تولید تسک‌های کوددهی
    for (const item of carePlan.fertilizerSchedule) {
      const scheduledAt = new Date(startDate);
      scheduledAt.setDate(scheduledAt.getDate() + item.dayOfCycle);

      if (scheduledAt <= endDate) {
        schedules.push(
          this.careScheduleRepository.create({
            userId: carePlan.userId,
            deviceId: carePlan.deviceId,
            plantSpeciesId: carePlan.plantSpeciesId,
            carePlanId: carePlan.id,
            taskType: CareTaskType.FERTILIZING,
            scheduledAt,
            productId: item.productId,
            dosage: `${item.dosageGrams}g`,
            status: CareScheduleStatus.PENDING,
          }),
        );
      }
    }

    // ۳. تولید تسک‌های سم‌پاشی
    for (const item of carePlan.pesticideSchedule) {
      const scheduledAt = new Date(startDate);
      scheduledAt.setDate(scheduledAt.getDate() + item.dayOfCycle);

      if (scheduledAt <= endDate) {
        schedules.push(
          this.careScheduleRepository.create({
            userId: carePlan.userId,
            deviceId: carePlan.deviceId,
            plantSpeciesId: carePlan.plantSpeciesId,
            carePlanId: carePlan.id,
            taskType: CareTaskType.PESTICIDE,
            scheduledAt,
            productId: item.productId,
            dosage: `${item.dosageMl}ml`,
            status: CareScheduleStatus.PENDING,
          }),
        );
      }
    }

    return this.careScheduleRepository.save(schedules);
  }

  /**
   * حذف تسک‌های باقیمانده یک CarePlan
   * (برای زمانی که CarePlan جایگزین می‌شود)
   */
  async deleteRemainingTasks(carePlanId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.careScheduleRepository.delete({
      carePlanId,
      scheduledAt: MoreThanOrEqual(today),
      status: CareScheduleStatus.PENDING,
    });
  }
}

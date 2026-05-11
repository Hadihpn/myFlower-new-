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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const care_schedules_entity_1 = require("./entities/care-schedules.entity");
const devices_service_1 = require("../devices/devices.service");
const care_plan_entity_1 = require("../care-plan/entities/care-plan.entity");
let CareScheduleService = class CareScheduleService {
    constructor(careScheduleRepository, carePlanRepository, devicesService) {
        this.careScheduleRepository = careScheduleRepository;
        this.carePlanRepository = carePlanRepository;
        this.devicesService = devicesService;
    }
    async getUpcomingTasks(userId, deviceId) {
        const device = await this.devicesService.findDeviceByDeviceId(deviceId);
        if (!device)
            throw new common_1.NotFoundException('Device not found');
        if (device.userId !== userId)
            throw new common_1.NotFoundException('Access denied');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.careScheduleRepository.find({
            where: {
                userId,
                deviceId: device.deviceId,
                scheduledAt: (0, typeorm_2.MoreThanOrEqual)(today),
                status: care_schedules_entity_1.CareScheduleStatus.PENDING,
            },
            order: { scheduledAt: 'ASC' },
            take: 30,
        });
    }
    async completeTask(userId, taskId, notes) {
        const task = await this.careScheduleRepository.findOne({
            where: { id: taskId, userId },
        });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        task.status = care_schedules_entity_1.CareScheduleStatus.COMPLETED;
        task.completedAt = new Date();
        if (notes)
            task.notes = notes;
        return this.careScheduleRepository.save(task);
    }
    async skipTask(userId, taskId, reason) {
        const task = await this.careScheduleRepository.findOne({
            where: { id: taskId, userId },
        });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        task.status = care_schedules_entity_1.CareScheduleStatus.SKIPPED;
        if (reason)
            task.reason = reason;
        await this.careScheduleRepository.save(task);
        if (task.carePlanId) {
            await this.incrementSkipCount(task.carePlanId);
        }
        return task;
    }
    async incrementSkipCount(carePlanId) {
        const carePlan = await this.carePlanRepository.findOne({
            where: { id: carePlanId, status: care_plan_entity_1.CarePlanStatus.ACTIVE },
        });
        if (!carePlan)
            return;
        carePlan.skipCount += 1;
        await this.carePlanRepository.save(carePlan);
        if (carePlan.skipCount >= 3) {
        }
    }
    async generateSchedulesFromCarePlan(carePlan, startDate, durationDays) {
        const schedules = [];
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationDays);
        for (let day = 0; day < durationDays; day += carePlan.wateringFrequencyDays) {
            const scheduledAt = new Date(startDate);
            scheduledAt.setDate(scheduledAt.getDate() + day);
            schedules.push(this.careScheduleRepository.create({
                userId: carePlan.userId,
                deviceId: carePlan.deviceId,
                plantSpeciesId: carePlan.plantSpeciesId,
                carePlanId: carePlan.id,
                taskType: care_schedules_entity_1.CareTaskType.WATERING,
                scheduledAt,
                status: care_schedules_entity_1.CareScheduleStatus.PENDING,
            }));
        }
        for (const item of carePlan.fertilizerSchedule) {
            const scheduledAt = new Date(startDate);
            scheduledAt.setDate(scheduledAt.getDate() + item.dayOfCycle);
            if (scheduledAt <= endDate) {
                schedules.push(this.careScheduleRepository.create({
                    userId: carePlan.userId,
                    deviceId: carePlan.deviceId,
                    plantSpeciesId: carePlan.plantSpeciesId,
                    carePlanId: carePlan.id,
                    taskType: care_schedules_entity_1.CareTaskType.FERTILIZING,
                    scheduledAt,
                    productId: item.productId,
                    dosage: `${item.dosageGrams}g`,
                    status: care_schedules_entity_1.CareScheduleStatus.PENDING,
                }));
            }
        }
        for (const item of carePlan.pesticideSchedule) {
            const scheduledAt = new Date(startDate);
            scheduledAt.setDate(scheduledAt.getDate() + item.dayOfCycle);
            if (scheduledAt <= endDate) {
                schedules.push(this.careScheduleRepository.create({
                    userId: carePlan.userId,
                    deviceId: carePlan.deviceId,
                    plantSpeciesId: carePlan.plantSpeciesId,
                    carePlanId: carePlan.id,
                    taskType: care_schedules_entity_1.CareTaskType.PESTICIDE,
                    scheduledAt,
                    productId: item.productId,
                    dosage: `${item.dosageMl}ml`,
                    status: care_schedules_entity_1.CareScheduleStatus.PENDING,
                }));
            }
        }
        return this.careScheduleRepository.save(schedules);
    }
    async deleteRemainingTasks(carePlanId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await this.careScheduleRepository.delete({
            carePlanId,
            scheduledAt: (0, typeorm_2.MoreThanOrEqual)(today),
            status: care_schedules_entity_1.CareScheduleStatus.PENDING,
        });
    }
};
exports.CareScheduleService = CareScheduleService;
exports.CareScheduleService = CareScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(care_schedules_entity_1.CareSchedule)),
    __param(1, (0, typeorm_1.InjectRepository)(care_plan_entity_1.CarePlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        devices_service_1.DevicesService])
], CareScheduleService);
//# sourceMappingURL=care-schedule.service.js.map
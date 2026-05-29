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
var CarePlanService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarePlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const care_plan_entity_1 = require("./entities/care-plan.entity");
const care_task_entity_1 = require("../care-task/entities/care-task.entity");
const user_plant_selection_entity_1 = require("../user-plant-selections/entities/user-plant-selection.entity");
const sensor_readings_service_1 = require("../sensor-readings/sensor-readings.service");
const ai_service_1 = require("../ai/ai.service");
const carePlanStatus_enum_1 = require("./enums/carePlanStatus.enum");
const generatorType_enum_1 = require("./enums/generatorType.enum");
const taskType_enum_1 = require("../care-task/enums/taskType.enum");
const taskStatus_enum_1 = require("../care-task/enums/taskStatus.enum");
const optimalType_enum_1 = require("../care-task/enums/optimalType.enum");
const notifications_service_1 = require("../notifications/notifications.service");
let CarePlanService = CarePlanService_1 = class CarePlanService {
    constructor(carePlanRepo, careTaskRepo, userPlantSelectionRepo, sensorReadingsService, aiService, notificationService) {
        this.carePlanRepo = carePlanRepo;
        this.careTaskRepo = careTaskRepo;
        this.userPlantSelectionRepo = userPlantSelectionRepo;
        this.sensorReadingsService = sensorReadingsService;
        this.aiService = aiService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(CarePlanService_1.name);
        this.PLAN_DURATION_DAYS = 28;
        this.AI_Requested_TIMES = 2;
        this.MIN_SENSOR_DAYS_FOR_AI = 7;
    }
    async createInitialPlan(userPlantSelectionId) {
        console.log('createInitialPlan', userPlantSelectionId);
        const selection = await this.userPlantSelectionRepo.findOne({
            where: { id: userPlantSelectionId },
        });
        console.log('selection :', selection);
        if (!selection) {
            throw new common_1.NotFoundException('UserPlantSelection not found');
        }
        const deviceAge = await this.getDeviceDataAge(selection.deviceId);
        console.log('deviceAge :', deviceAge);
        console.log('this.MIN_SENSOR_DAYS_FOR_AI ', this.MIN_SENSOR_DAYS_FOR_AI);
        const useAi = deviceAge >= this.MIN_SENSOR_DAYS_FOR_AI;
        console.log('deviceAge', deviceAge);
        console.log('useAi', useAi);
        this.logger.log(`Creating plan for selection ${userPlantSelectionId}, deviceAge: ${deviceAge}, useAi: ${useAi}`);
        if (useAi) {
            try {
                console.log('useAi tru');
                return await this.generateAiBasedPlan(selection);
            }
            catch (error) {
                console.log('userAi false');
            }
        }
        else {
            console.log('userAi false');
            return await this.generateRuleBasedPlan(selection);
        }
    }
    async generateAiBasedPlan(selection) {
        let carePlan;
        console.log('generateAiBasedPlan');
        const sensorSnapshot = await this.buildSensorSnapshot(selection.deviceId);
        const aiResponse = await this.aiService.generateCarePlan(selection, sensorSnapshot);
        console.log('aiResponse :', aiResponse);
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);
        console.log('plan service', selection.id, aiResponse.reasoning.toString());
        if (!carePlan || carePlan < this.AI_Requested_TIMES) {
            carePlan = await this.carePlanRepo.create({
                userPlantSelectionId: selection.id,
                status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
                generatorType: generatorType_enum_1.GeneratorType.AI,
                startDate,
                endDate,
                sensorSnapshot,
                aiRecommendations: 'aiResponse.reasoning',
            });
        }
        const plan = await this.carePlanRepo.create({
            userPlantSelectionId: selection.id,
            status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
            generatorType: generatorType_enum_1.GeneratorType.AI,
            startDate,
            endDate,
            sensorSnapshot,
            aiRecommendations: 'aiResponse.reasoning',
        });
        await this.carePlanRepo.save(plan);
        const tasks = aiResponse.tasks.map((task) => this.careTaskRepo.create({
            carePlanId: plan.id,
            taskType: task.taskType,
            scheduledDate: new Date(task.scheduledDate),
            optimalTime: task.optimalTime,
            status: taskStatus_enum_1.TaskStatus.PENDING,
            instructions: task.instructions,
            shopProductType: task.shopProductType,
        }));
        await this.careTaskRepo.save(tasks);
        this.logger.log(`AI plan created: ${plan.id} with ${tasks.length} tasks`);
        return plan;
    }
    async generateRuleBasedPlan(selection) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);
        const plan = this.carePlanRepo.create({
            userPlantSelectionId: selection.id,
            status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
            generatorType: generatorType_enum_1.GeneratorType.RULE_BASED,
            startDate,
            endDate,
            sensorSnapshot: null,
            aiRecommendations: null,
        });
        await this.carePlanRepo.save(plan);
        const tasks = this.generateRuleBasedTasks(plan.id, startDate);
        await this.careTaskRepo.save(tasks);
        this.logger.log(`Rule-based plan created: ${plan.id} with ${tasks.length} tasks`);
        return plan;
    }
    generateRuleBasedTasks(carePlanId, startDate) {
        const tasks = [];
        for (let day = 0; day < this.PLAN_DURATION_DAYS; day += 3) {
            const scheduledDate = new Date(startDate);
            scheduledDate.setDate(scheduledDate.getDate() + day);
            tasks.push(this.careTaskRepo.create({
                carePlanId,
                taskType: taskType_enum_1.TaskType.WATERING,
                scheduledDate,
                optimalTime: optimalType_enum_1.OptimalTime.MORNING,
                status: taskStatus_enum_1.TaskStatus.PENDING,
                instructions: 'Water the plant thoroughly until soil is moist.',
                shopProductType: null,
            }));
        }
        [7, 21].forEach((day) => {
            const scheduledDate = new Date(startDate);
            scheduledDate.setDate(scheduledDate.getDate() + day);
            tasks.push(this.careTaskRepo.create({
                carePlanId,
                taskType: taskType_enum_1.TaskType.FERTILIZING,
                scheduledDate,
                optimalTime: optimalType_enum_1.OptimalTime.MORNING,
                status: taskStatus_enum_1.TaskStatus.PENDING,
                instructions: 'Apply balanced fertilizer according to package instructions.',
                shopProductType: 'nitrogen_fertilizer',
            }));
        });
        const pruningDate = new Date(startDate);
        pruningDate.setDate(pruningDate.getDate() + 14);
        tasks.push(this.careTaskRepo.create({
            carePlanId,
            taskType: taskType_enum_1.TaskType.PRUNING,
            scheduledDate: pruningDate,
            optimalTime: optimalType_enum_1.OptimalTime.AFTERNOON,
            status: taskStatus_enum_1.TaskStatus.PENDING,
            instructions: 'Remove dead or yellowing leaves.',
            shopProductType: 'pruning_tool',
        }));
        return tasks;
    }
    async triggerAiRecalibration(carePlanId) {
        const oldPlan = await this.carePlanRepo.findOne({
            where: { id: carePlanId },
            relations: [
                'userPlantSelection',
                'userPlantSelection.device',
                'userPlantSelection.plantSpecies',
                'userPlantSelection.plantGroup',
            ],
        });
        if (!oldPlan) {
            throw new common_1.NotFoundException('CarePlan not found');
        }
        oldPlan.status = carePlanStatus_enum_1.CarePlanStatus.CANCELLED;
        await this.carePlanRepo.save(oldPlan);
        await this.careTaskRepo.update({ carePlanId: oldPlan.id, status: taskStatus_enum_1.TaskStatus.PENDING }, { status: taskStatus_enum_1.TaskStatus.CANCELLED });
        this.logger.log(`Plan ${carePlanId} cancelled due to skip feedback`);
        const sensorSnapshot = await this.buildSensorSnapshot(oldPlan.userPlantSelection.deviceId);
        const skipFeedback = 'User skipped 3 consecutive tasks of same type';
        const aiResponse = await this.aiService.generateCarePlan(oldPlan.userPlantSelection, sensorSnapshot, skipFeedback);
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);
        const newPlan = this.carePlanRepo.create({
            userPlantSelectionId: oldPlan.userPlantSelectionId,
            status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
            generatorType: generatorType_enum_1.GeneratorType.AI,
            startDate,
            endDate,
            sensorSnapshot,
            aiRecommendations: aiResponse.reasoning,
        });
        await this.carePlanRepo.save(newPlan);
        const tasks = aiResponse.tasks.map((task) => this.careTaskRepo.create({
            carePlanId: newPlan.id,
            taskType: task.taskType,
            scheduledDate: new Date(task.scheduledDate),
            optimalTime: task.optimalTime,
            status: taskStatus_enum_1.TaskStatus.PENDING,
            instructions: task.instructions,
            shopProductType: task.shopProductType,
        }));
        await this.careTaskRepo.save(tasks);
        this.logger.log(`Recalibrated plan created: ${newPlan.id}`);
        return newPlan;
    }
    async cancelCurrentPlan(userPlantSelectionId) {
        const activePlan = await this.carePlanRepo.findOne({
            where: {
                userPlantSelectionId,
                status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
            },
        });
        if (activePlan) {
            activePlan.status = carePlanStatus_enum_1.CarePlanStatus.CANCELLED;
            await this.carePlanRepo.save(activePlan);
            await this.careTaskRepo.update({ carePlanId: activePlan.id, status: taskStatus_enum_1.TaskStatus.PENDING }, { status: taskStatus_enum_1.TaskStatus.CANCELLED });
            this.logger.log(`Plan ${activePlan.id} cancelled`);
        }
    }
    async checkExpiredPlans() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiredPlans = await this.carePlanRepo.find({
            where: {
                endDate: (0, typeorm_2.LessThanOrEqual)(today),
                status: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
            },
            relations: ['userPlantSelection'],
        });
        for (const plan of expiredPlans) {
            plan.status = carePlanStatus_enum_1.CarePlanStatus.COMPLETED;
            await this.carePlanRepo.save(plan);
            await this.createInitialPlan(plan.userPlantSelectionId);
            this.logger.log(`Plan ${plan.id} completed, new plan created`);
        }
    }
    async getDeviceDataAge(deviceId) {
        const count = await this.sensorReadingsService.getReadingsForDevice(deviceId);
        return count.length > 0 ? 7 : 0;
    }
    async buildSensorSnapshot(deviceId) {
        const readings = await this.sensorReadingsService.getReadingsForDevice(deviceId);
        console.log(' buildSensorSnapshot readings : ', readings[0]);
        if (readings.length === 0) {
            return {};
        }
        const avgTemperature = readings.reduce((sum, r) => parseInt(sum.toString()) + (parseInt(r.temperature.toString()) || 0), 0) / readings.length;
        console.log('avgTemperature :', avgTemperature);
        const avgHumidity = readings.reduce((sum, r) => parseInt(sum.toString()) + (parseInt(r.humidity.toString()) || 0), 0) / readings.length;
        console.log('avgHumidity :', avgHumidity);
        const avgSoilMoisture = readings.reduce((sum, r) => parseInt(sum.toString()) + (parseInt(r.moisture.toString()) || 0), 0) / readings.length;
        console.log('avgSoilMoisture :', avgSoilMoisture);
        const avgLight = readings.reduce((sum, r) => parseInt(sum.toString()) + (parseInt(r.light.toString()) || 0), 0) / readings.length;
        console.log('avgLight :', avgLight);
        return {
            avgTemperature: avgTemperature.toFixed(1),
            avgHumidity: avgHumidity.toFixed(1),
            avgSoilMoisture: avgSoilMoisture.toFixed(1),
            avgLight: avgLight.toFixed(0),
            readingsCount: readings.length,
        };
    }
    async sendDailyTaskReminders() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const tasks = await this.careTaskRepo.find({
            where: {
                scheduledDate: tomorrow,
                status: taskStatus_enum_1.TaskStatus.PENDING,
            },
            relations: [
                'plan',
                'plan.userPlantSelection',
                'plan.userPlantSelection.user',
            ],
        });
        const tasksByUser = tasks.reduce((acc, task) => {
            const user = task.carePlan.userPlantSelection.user;
            const userEmail = user.email;
            if (!acc[userEmail]) {
                acc[userEmail] = {
                    userId: user.id,
                    userName: user.fullName,
                    tasks: [],
                };
            }
            acc[userEmail].tasks.push(task);
            return acc;
        }, {});
        for (const [email, data] of Object.entries(tasksByUser)) {
            const tasksJson = JSON.stringify(data.tasks.map((task) => ({
                id: task.id,
                type: task.taskType,
                instruction: task.instructions,
                scheduledDate: task.scheduledDate,
                optimalTime: task.optimalTime,
                status: task.status,
            })), null, 2);
            for (const [email, data] of Object.entries(tasksByUser)) {
                await this.notificationService.sendEmail(email, 'یادآوری', tasksJson);
            }
        }
    }
};
exports.CarePlanService = CarePlanService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarePlanService.prototype, "checkExpiredPlans", null);
__decorate([
    (0, schedule_1.Cron)('0 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarePlanService.prototype, "sendDailyTaskReminders", null);
exports.CarePlanService = CarePlanService = CarePlanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(care_plan_entity_1.CarePlan)),
    __param(1, (0, typeorm_1.InjectRepository)(care_task_entity_1.CareTask)),
    __param(2, (0, typeorm_1.InjectRepository)(user_plant_selection_entity_1.UserPlantSelection)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, sensor_readings_service_1.SensorReadingsService,
        ai_service_1.AiService,
        notifications_service_1.NotificationsService])
], CarePlanService);
//# sourceMappingURL=care-plan.services.js.map
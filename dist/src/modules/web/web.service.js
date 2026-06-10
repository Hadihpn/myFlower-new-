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
exports.WebService = void 0;
const common_1 = require("@nestjs/common");
const user_plant_selections_service_1 = require("../user-plant-selections/user-plant-selections.service");
const devices_service_1 = require("../devices/devices.service");
const care_task_services_1 = require("../care-task/care-task.services");
const sensor_readings_service_1 = require("../sensor-readings/sensor-readings.service");
let WebService = class WebService {
    constructor(userPlantSelectionsService, devicesService, careTaskService, sensorReadingsService) {
        this.userPlantSelectionsService = userPlantSelectionsService;
        this.devicesService = devicesService;
        this.careTaskService = careTaskService;
        this.sensorReadingsService = sensorReadingsService;
    }
    async getUserDashboard(userId) {
        console.log("xuserId", userId);
        let x = await this.devicesService.findUserDevices(userId);
        console.log("xxx", x);
        let z = await this.careTaskService.getTodayTasks(userId);
        console.log("zzz", z);
        let y = await this.userPlantSelectionsService.getUserSelections(userId);
        console.log("yyy", y);
        const [devices, selections, todayTasks] = await Promise.all([
            this.devicesService.findUserDevices(userId),
            this.userPlantSelectionsService.getUserSelections(userId),
            this.careTaskService.getTodayTasks(userId),
        ]);
        console.log("[devices, selections, todayTask", { devices, selections, todayTasks });
        const selectionByDevice = new Map(selections.map((s) => [s.deviceId, s]));
        const devices$ = await Promise.all(devices.map(async (device) => {
            const [latestReadings, selection] = await Promise.all([
                this.sensorReadingsService.getReadingsForDevice(device.deviceId, 7),
                Promise.resolve(selectionByDevice.get(device.deviceId) ?? null),
            ]);
            return {
                id: device.id,
                name: device.name,
                status: device.status,
                createdAt: device.createdAt,
                plants: selection ? this.resolvePlantInfo(selection) : [],
                latestReadings,
            };
        }));
        console.log("nnnn", devices$);
        console.log("mmmm", selectionByDevice);
        return {
            plants: devices$[0].plants,
            deviceCount: devices.length,
            devices: devices$,
            todayTasks,
        };
    }
    resolvePlantInfo(selection) {
        if (selection.plantSpecies) {
            return [{ name: selection.plantSpecies.name, imageUrl: selection.plantSpecies.imageUrl ?? null }];
        }
        if (selection.package?.items?.length) {
            return selection.package.items.map((item) => ({
                name: item.plantSpecies.name,
                imageUrl: item.plantSpecies.imageUrl ?? null,
            }));
        }
        return [];
    }
};
exports.WebService = WebService;
exports.WebService = WebService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_plant_selections_service_1.UserPlantSelectionsService,
        devices_service_1.DevicesService,
        care_task_services_1.CareTaskService,
        sensor_readings_service_1.SensorReadingsService])
], WebService);
//# sourceMappingURL=web.service.js.map
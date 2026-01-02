"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorVerificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensor_verification_service_1 = require("./sensor-verification.service");
const sensor_verification_controller_1 = require("./sensor-verification.controller");
const sensor_verification_entity_1 = require("./entities/sensor-verification.entity");
const notifications_module_1 = require("../notifications/notifications.module");
let SensorVerificationModule = class SensorVerificationModule {
};
exports.SensorVerificationModule = SensorVerificationModule;
exports.SensorVerificationModule = SensorVerificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sensor_verification_entity_1.SensorVerification]),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
        ],
        controllers: [sensor_verification_controller_1.SensorVerificationController],
        providers: [sensor_verification_service_1.SensorVerificationService],
        exports: [sensor_verification_service_1.SensorVerificationService],
    })
], SensorVerificationModule);
//# sourceMappingURL=sensor-verification.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const configuration_1 = require("./config/configuration");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const payment_module_1 = require("./modules/payment/payment.module");
const plants_module_1 = require("./modules/plants/plants.module");
const devices_module_1 = require("./modules/devices/devices.module");
const sensor_readings_module_1 = require("./modules/sensor-readings/sensor-readings.module");
const sensor_verification_module_1 = require("./modules/sensor-verification/sensor-verification.module");
const user_plant_selections_module_1 = require("./modules/user-plant-selections/user-plant-selections.module");
const advice_module_1 = require("./modules/advice/advice.module");
const user_actions_module_1 = require("./modules/user-actions/user-actions.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const admin_module_1 = require("./modules/admin/admin.module");
const daily_summary_module_1 = require("./modules/daily-summary/daily-summary.module");
const throttler_2 = require("@nestjs/throttler");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const cache_manager_1 = require("@nestjs/cache-manager");
const care_plan_module_1 = require("./modules/care-plan/care-plan.module");
const care_task_module_1 = require("./modules/care-task/care-task.module");
const care_task_feedback_module_1 = require("./modules/care-task-feedback/care-task-feedback.module");
const schedule_1 = require("@nestjs/schedule");
const llm_service_1 = require("./llm/llm.service");
const web_module_1 = require("./modules/web/web.module");
const web_jwt_auth_guard_1 = require("./common/guards/web-jwt-auth.guard");
const user_interceptor_1 = require("./common/interceptors/user.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 300,
                max: 1000,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    entities: [__dirname + '/**/*.entity.js'],
                    synchronize: configService.get('database.synchronize'),
                    logging: configService.get('database.logging'),
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => [
                    {
                        ttl: configService.get('throttle.ttl'),
                        limit: configService.get('throttle.limit'),
                    },
                ],
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            subscription_module_1.SubscriptionModule,
            payment_module_1.PaymentModule,
            plants_module_1.PlantsModule,
            devices_module_1.DevicesModule,
            sensor_readings_module_1.SensorReadingsModule,
            sensor_verification_module_1.SensorVerificationModule,
            user_plant_selections_module_1.UserPlantSelectionsModule,
            advice_module_1.AdviceModule,
            user_actions_module_1.UserActionsModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
            daily_summary_module_1.DailySummaryModule,
            care_plan_module_1.CarePlanModule,
            care_task_module_1.CareTaskModule,
            care_task_feedback_module_1.CareTaskFeedbackModule,
            web_module_1.WebModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: web_jwt_auth_guard_1.WebJwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_2.ThrottlerGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: user_interceptor_1.UserInterceptor,
            },
            llm_service_1.LlmService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
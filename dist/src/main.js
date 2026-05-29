"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    console.log('🔗 Database connection initiated...');
    console.log(`📊 Connected to: ${configService.get('database.host')}:${configService.get('database.port')}/${configService.get('database.database')}`);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Plant Monitoring System API')
        .setDescription('IoT-based Plant Monitoring and Care Advice System')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT')
        .addApiKey({
        type: 'apiKey',
        name: 'x-device-id',
        in: 'header',
        description: 'Device ID',
    }, 'DeviceId')
        .addApiKey({
        type: 'apiKey',
        name: 'x-device-token',
        in: 'header',
        description: 'Device Token',
    }, 'DeviceToken')
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Users', 'User management')
        .addTag('Subscription', 'Subscription management')
        .addTag('Payment', 'Payment processing')
        .addTag('Plants', 'Plant catalog management')
        .addTag('Devices', 'IoT device management')
        .addTag('Sensor Readings', 'Sensor data collection')
        .addTag('User Plant Selections', 'User plant monitoring')
        .addTag('Advice', 'Plant care advice')
        .addTag('User Actions', 'User care actions logging')
        .addTag('Admin', 'Admin panel')
        .addTag('ََCare Schedules', 'Care Schedules panel')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('port') || 3000;
    await app.listen(3000, '0.0.0.0');
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`✅ Database connected successfully!`);
    console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Database connection logging
  console.log('🔗 Database connection initiated...');
  console.log(`📊 Connected to: ${configService.get('database.host')}:${configService.get('database.port')}/${configService.get('database.database')}`);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Static files for uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter (Winston logging)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Plant Monitoring System API')
    .setDescription('IoT-based Plant Monitoring and Care Advice System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-device-id',
        in: 'header',
        description: 'Device ID',
      },
      'DeviceId',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-device-token',
        in: 'header',
        description: 'Device Token',
      },
      'DeviceToken',
    )
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('port') || 3000;
  await app.listen(3000,'0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`✅ Database connected successfully!`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();

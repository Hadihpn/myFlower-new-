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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const notification_settings_entity_1 = require("./entities/notification-settings.entity");
const notification_entity_1 = require("./entities/notification.entity");
const devices_service_1 = require("../devices/devices.service");
let NotificationsService = class NotificationsService {
    constructor(configService, devicesService, settingsRepository, notificationRepository) {
        this.configService = configService;
        this.devicesService = devicesService;
        this.settingsRepository = settingsRepository;
        this.notificationRepository = notificationRepository;
        this.transporter = nodemailer.createTransport({
            host: "smtp.c1.liara.email",
            port: 587,
            secure: false,
            auth: {
                user: "loving_kowalevski_okuhtc",
                pass: "03d80178-0b6f-417c-aed2-e039ce166330",
            },
        });
    }
    async getSettings(userId) {
        let settings = await this.settingsRepository.findOne({
            where: { userId },
        });
        if (!settings) {
            settings = this.settingsRepository.create({
                userId,
                emailEnabled: true,
                suddenChangeAlerts: true,
                thresholdAlerts: true,
                welcomeEmails: true,
            });
            await this.settingsRepository.save(settings);
        }
        return settings;
    }
    async updateSettings(userId, updateDto) {
        let settings = await this.settingsRepository.findOne({
            where: { userId },
        });
        if (!settings) {
            settings = this.settingsRepository.create({
                userId,
                ...updateDto,
            });
        }
        else {
            Object.assign(settings, updateDto);
        }
        return await this.settingsRepository.save(settings);
    }
    async sendEmail(to, subject, html) {
        try {
            console.log('sendemail', { to, subject, html });
            console.log('from email', this.configService.get('email.from'));
            await this.transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to,
                subject,
                html,
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
    async sendSuddenChangeAlert(deviceId, changeType, magnitude) {
        const device = await this.devicesService.findDeviceByDeviceId(deviceId);
        if (!device) {
            throw new common_1.NotFoundException(`Device ${deviceId} not found`);
        }
        const settings = await this.settingsRepository.findOne({
            where: { userId: device.user.id },
            relations: ['user'],
        });
        if (!settings || !settings.emailEnabled || !settings.suddenChangeAlerts) {
            return;
        }
        const html = `
      <h2>⚠️ Sudden Environmental Change Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>Change Type: ${changeType}</p>
      <p>Magnitude: ${magnitude}</p>
      <p>Please check your plants immediately!</p>
    `;
        await this.sendEmail(settings.user.email, 'Plant Alert: Sudden Change Detected', html);
    }
    async sendSensorAnomalyNotification(deviceId, messages) {
        const device = await this.devicesService.findDeviceByDeviceId(deviceId);
        if (!device) {
            throw new common_1.NotFoundException(`Device ${deviceId} not found`);
        }
        const settings = await this.settingsRepository.findOne({
            where: { userId: device.user.id },
            relations: ['user'],
        });
        if (!settings || !settings.emailEnabled || !settings.thresholdAlerts) {
            return;
        }
        const messageList = messages.map((msg) => `<li>${msg}</li>`).join('');
        const html = `
      <h2>⚠️ Sensor Anomalies Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>The following issues were detected:</p>
      <ul>${messageList}</ul>
      <p>Please check your plants!</p>
    `;
        await this.sendEmail(settings.user.email, 'Plant Alert: Sensor Anomalies Detected', html);
    }
    async sendWelcomeEmail(email, name) {
        const templatePath = path.join(__dirname, 'templates', 'welcome.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);
        const html = template({
            name,
            appUrl: this.configService.get('appUrl'),
        });
        await this.sendEmail(email, '🌱 Welcome to Plant Monitoring System!', html);
    }
    async sendThresholdAlert(email, name, messages) {
        const templatePath = path.join(__dirname, 'templates', 'unsuiteCondition.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);
        const html = template({
            title: 'Unsuitable Condition Alert',
            name,
            messages,
            signature: 'The MyFlower Team',
            appUrl: this.configService.get('appUrl'),
        });
        await this.sendEmail(email, 'Unsuitable condition', html);
    }
    async createNotification(dto) {
        const notification = this.notificationRepository.create({
            userId: dto.userId,
            deviceId: dto.deviceId || null,
            type: dto.type,
            message: dto.message,
            severity: dto.severity,
            isRead: false,
            readAt: null,
        });
        return await this.notificationRepository.save(notification);
    }
    async getNotifications(userId, query) {
        const { page = 1, limit = 20, type, severity } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.userId = :userId', { userId })
            .orderBy('notification.createdAt', 'DESC')
            .skip(skip)
            .take(limit);
        if (type) {
            queryBuilder.andWhere('notification.type = :type', { type });
        }
        if (severity) {
            queryBuilder.andWhere('notification.severity = :severity', { severity });
        }
        const [notifications, total] = await queryBuilder.getManyAndCount();
        return {
            data: notifications.map(this.toResponseDto),
            total,
            page,
            limit,
        };
    }
    async getUnreadCount(userId) {
        return await this.notificationRepository.count({
            where: { userId, isRead: false },
        });
    }
    async getUnreadNotifications(userId) {
        const notifications = await this.notificationRepository.find({
            where: { userId, isRead: false },
            order: { createdAt: 'DESC' },
            take: 50,
        });
        return notifications.map(this.toResponseDto);
    }
    async markAsRead(userId, notificationId) {
        const notification = await this.notificationRepository.findOne({
            where: { id: notificationId, userId },
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        if (!notification.isRead) {
            notification.isRead = true;
            notification.readAt = new Date();
            await this.notificationRepository.save(notification);
        }
        return this.toResponseDto(notification);
    }
    async markAllAsRead(userId) {
        const result = await this.notificationRepository
            .createQueryBuilder()
            .update(notification_entity_1.Notification)
            .set({ isRead: true, readAt: new Date() })
            .where('userId = :userId AND isRead = false', { userId })
            .execute();
        return { affected: result.affected || 0 };
    }
    async deleteNotification(userId, notificationId) {
        const result = await this.notificationRepository.delete({
            id: notificationId,
            userId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Notification not found');
        }
    }
    toResponseDto(notification) {
        return {
            id: notification.id,
            userId: notification.userId,
            deviceId: notification.deviceId,
            type: notification.type,
            message: notification.message,
            severity: notification.severity,
            isRead: notification.isRead,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(notification_settings_entity_1.NotificationSettings)),
    __param(3, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, devices_service_1.DevicesService, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map
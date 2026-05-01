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
const devices_service_1 = require("../devices/devices.service");
let NotificationsService = class NotificationsService {
    constructor(configService, devicesService, settingsRepository) {
        this.configService = configService;
        this.devicesService = devicesService;
        this.settingsRepository = settingsRepository;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('email.host'),
            port: this.configService.get('email.port'),
            secure: this.configService.get('email.secure', false),
            auth: {
                user: this.configService.get('email.user'),
                pass: this.configService.get('email.pass'),
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
            await this.transporter.sendMail({
                from: this.configService.get('email.from'),
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
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(notification_settings_entity_1.NotificationSettings)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        devices_service_1.DevicesService,
        typeorm_2.Repository])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map
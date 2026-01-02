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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
let NotificationsService = class NotificationsService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.c1.liara.email',
            port: 587,
            secure: false,
            auth: {
                user: 'adoring_mccarthy_9fga3o',
                pass: '88e41d01-468e-4f95-a6a9-e8a50400a93e',
            },
        });
    }
    async sendEmail(to, subject, html) {
        try {
            console.log("sendemail");
            console.log(to, subject, html);
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
        const html = `
      <h2>⚠️ Sudden Environmental Change Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>Change Type: ${changeType}</p>
      <p>Magnitude: ${magnitude}</p>
      <p>Please check your plants immediately!</p>
    `;
        await this.sendEmail('user@example.com', 'Plant Alert: Sudden Change Detected', html);
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
        ``;
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map
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
exports.NotificationSettings = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let NotificationSettings = class NotificationSettings {
};
exports.NotificationSettings = NotificationSettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', unique: true }),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], NotificationSettings.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_enabled', default: true }),
    __metadata("design:type", Boolean)
], NotificationSettings.prototype, "emailEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sudden_change_alerts', default: true }),
    __metadata("design:type", Boolean)
], NotificationSettings.prototype, "suddenChangeAlerts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'threshold_alerts', default: true }),
    __metadata("design:type", Boolean)
], NotificationSettings.prototype, "thresholdAlerts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'welcome_emails', default: true }),
    __metadata("design:type", Boolean)
], NotificationSettings.prototype, "welcomeEmails", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NotificationSettings.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NotificationSettings.prototype, "updatedAt", void 0);
exports.NotificationSettings = NotificationSettings = __decorate([
    (0, typeorm_1.Entity)('notification_settings')
], NotificationSettings);
//# sourceMappingURL=notification-settings.entity.js.map
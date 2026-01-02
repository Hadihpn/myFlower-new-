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
exports.UserAction = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const device_entity_1 = require("../../devices/entities/device.entity");
const user_plant_selection_entity_1 = require("../../user-plant-selections/entities/user-plant-selection.entity");
const action_type_enum_1 = require("../types/action-type.enum");
let UserAction = class UserAction {
};
exports.UserAction = UserAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserAction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id' }),
    __metadata("design:type", Number)
], UserAction.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selection_id' }),
    __metadata("design:type", Number)
], UserAction.prototype, "selectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'action_type',
        type: 'enum',
        enum: action_type_enum_1.ActionType,
    }),
    __metadata("design:type", String)
], UserAction.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserAction.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'action_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserAction.prototype, "actionDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserAction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.actions),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserAction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device, (device) => device.actions),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], UserAction.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_plant_selection_entity_1.UserPlantSelection, (selection) => selection.actions),
    (0, typeorm_1.JoinColumn)({ name: 'selection_id' }),
    __metadata("design:type", user_plant_selection_entity_1.UserPlantSelection)
], UserAction.prototype, "selection", void 0);
exports.UserAction = UserAction = __decorate([
    (0, typeorm_1.Entity)('user_actions'),
    (0, typeorm_1.Index)(['selectionId', 'actionDate'])
], UserAction);
//# sourceMappingURL=user-action.entity.js.map
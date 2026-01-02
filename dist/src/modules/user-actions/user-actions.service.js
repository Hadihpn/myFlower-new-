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
exports.UserActionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_action_entity_1 = require("./entities/user-action.entity");
let UserActionsService = class UserActionsService {
    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }
    async createAction(userId, createActionDto) {
        const { selectionId, ...actionData } = createActionDto;
        const action = this.actionRepository.create({
            userId,
            selectionId,
            deviceId: 0,
            ...actionData,
            actionDate: actionData.actionDate ? new Date(actionData.actionDate) : new Date(),
        });
        return this.actionRepository.save(action);
    }
    async getSelectionActions(selectionId) {
        return this.actionRepository.find({
            where: { selectionId },
            order: { actionDate: 'DESC' },
            take: 50,
        });
    }
    async getLastAction(selectionId, actionType) {
        return this.actionRepository.findOne({
            where: { selectionId, actionType },
            order: { actionDate: 'DESC' },
        });
    }
    async getUserActions(userId, limit = 50) {
        return this.actionRepository.find({
            where: { userId },
            relations: ['selection'],
            order: { actionDate: 'DESC' },
            take: limit,
        });
    }
};
exports.UserActionsService = UserActionsService;
exports.UserActionsService = UserActionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_action_entity_1.UserAction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserActionsService);
//# sourceMappingURL=user-actions.service.js.map
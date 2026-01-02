"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_actions_service_1 = require("./user-actions.service");
const user_actions_controller_1 = require("./user-actions.controller");
const user_action_entity_1 = require("./entities/user-action.entity");
let UserActionsModule = class UserActionsModule {
};
exports.UserActionsModule = UserActionsModule;
exports.UserActionsModule = UserActionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_action_entity_1.UserAction])],
        controllers: [user_actions_controller_1.UserActionsController],
        providers: [user_actions_service_1.UserActionsService],
        exports: [user_actions_service_1.UserActionsService],
    })
], UserActionsModule);
//# sourceMappingURL=user-actions.module.js.map
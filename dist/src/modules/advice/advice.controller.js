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
exports.AdviceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const advice_service_1 = require("./advice.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let AdviceController = class AdviceController {
    constructor(adviceService) {
        this.adviceService = adviceService;
    }
    getAdviceForSelection(userId, selectionId) {
        return this.adviceService.getAdviceForSelection(userId, selectionId);
    }
};
exports.AdviceController = AdviceController;
__decorate([
    (0, common_1.Get)('selection/:selectionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get care advice for plant selection' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plant care advice with health score' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('selectionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdviceController.prototype, "getAdviceForSelection", null);
exports.AdviceController = AdviceController = __decorate([
    (0, swagger_1.ApiTags)('Advice'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('advice'),
    __metadata("design:paramtypes", [advice_service_1.AdviceService])
], AdviceController);
//# sourceMappingURL=advice.controller.js.map
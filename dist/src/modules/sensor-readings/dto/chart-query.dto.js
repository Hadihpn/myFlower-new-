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
exports.ChartQueryDto = exports.ChartInterval = exports.ChartRange = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ChartRange;
(function (ChartRange) {
    ChartRange["SEVEN_DAYS"] = "7d";
    ChartRange["THIRTY_DAYS"] = "30d";
    ChartRange["NINETY_DAYS"] = "90d";
})(ChartRange || (exports.ChartRange = ChartRange = {}));
var ChartInterval;
(function (ChartInterval) {
    ChartInterval["HOURLY"] = "hourly";
    ChartInterval["DAILY"] = "daily";
    ChartInterval["WEEKLY"] = "weekly";
})(ChartInterval || (exports.ChartInterval = ChartInterval = {}));
class ChartQueryDto {
    constructor() {
        this.range = ChartRange.SEVEN_DAYS;
        this.interval = ChartInterval.DAILY;
    }
}
exports.ChartQueryDto = ChartQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ChartRange,
        default: ChartRange.SEVEN_DAYS,
        description: 'Time range for chart data',
        required: false,
    }),
    (0, class_validator_1.IsEnum)(ChartRange),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChartQueryDto.prototype, "range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ChartInterval,
        default: ChartInterval.DAILY,
        description: 'Data aggregation interval',
        required: false,
    }),
    (0, class_validator_1.IsEnum)(ChartInterval),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChartQueryDto.prototype, "interval", void 0);
//# sourceMappingURL=chart-query.dto.js.map
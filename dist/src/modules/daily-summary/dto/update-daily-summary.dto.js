"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDailySummaryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_daily_summary_dto_1 = require("./create-daily-summary.dto");
class UpdateDailySummaryDto extends (0, mapped_types_1.PartialType)(create_daily_summary_dto_1.CreateDailySummaryDto) {
}
exports.UpdateDailySummaryDto = UpdateDailySummaryDto;
//# sourceMappingURL=update-daily-summary.dto.js.map
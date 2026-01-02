"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdviceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_advice_dto_1 = require("./create-advice.dto");
class UpdateAdviceDto extends (0, mapped_types_1.PartialType)(create_advice_dto_1.CreateAdviceDto) {
}
exports.UpdateAdviceDto = UpdateAdviceDto;
//# sourceMappingURL=update-advice.dto.js.map
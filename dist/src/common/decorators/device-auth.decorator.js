"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentDevice = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentDevice = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const device = request.device;
    return data ? device?.[data] : device;
});
//# sourceMappingURL=device-auth.decorator.js.map
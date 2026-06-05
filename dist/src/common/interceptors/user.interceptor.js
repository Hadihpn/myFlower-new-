"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterceptor = void 0;
const common_1 = require("@nestjs/common");
let UserInterceptor = class UserInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        res.locals.currentPath = req.originalUrl;
        if (req.user) {
            res.locals.user = req.user;
        }
        else {
            res.locals.user = null;
        }
        return next.handle();
    }
};
exports.UserInterceptor = UserInterceptor;
exports.UserInterceptor = UserInterceptor = __decorate([
    (0, common_1.Injectable)()
], UserInterceptor);
//# sourceMappingURL=user.interceptor.js.map
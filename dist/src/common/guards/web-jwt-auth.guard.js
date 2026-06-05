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
var WebJwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebJwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("../decorators/public.decorator");
let WebJwtAuthGuard = WebJwtAuthGuard_1 = class WebJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.logger = new common_1.Logger(WebJwtAuthGuard_1.name);
    }
    canActivate(context) {
        const request1 = context.switchToHttp().getRequest();
        console.log('isActivate');
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const currentUrl = req.originalUrl || req.url || '/';
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (err) {
            throw err;
        }
        console.log('req.user', user);
        if (isPublic) {
            return user || null;
        }
        if (!user) {
            if (!currentUrl.startsWith('/login')) {
                const next = encodeURIComponent(currentUrl);
                res.redirect(`/login?next=${next}`);
            }
            return null;
        }
        return user;
    }
};
exports.WebJwtAuthGuard = WebJwtAuthGuard;
exports.WebJwtAuthGuard = WebJwtAuthGuard = WebJwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], WebJwtAuthGuard);
//# sourceMappingURL=web-jwt-auth.guard.js.map
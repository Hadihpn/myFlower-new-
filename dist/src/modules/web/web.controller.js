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
exports.WebController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const web_jwt_auth_guard_1 = require("../../common/guards/web-jwt-auth.guard");
const web_service_1 = require("./web.service");
let WebController = class WebController {
    constructor(webservice) {
        this.webservice = webservice;
    }
    getLoginPage(req, res) {
        if (req.cookies?.access_token) {
            return res.redirect('/dashboard');
        }
        console.log('req.query', req.query.status);
        const success = req.query.status === 'registered' ? 'ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.' : null;
        const error = req.query.error === 'invalid'
            ? 'ایمیل یا رمز عبور اشتباه است'
            : req.query.error === 'server'
                ? 'خطای سرور، دوباره تلاش کنید'
                : null;
        return { title: 'ورود به سیستم', success: success, error: error, email: req.query.email || '' };
    }
    getRegisterPage(req, res) {
        if (req.cookies?.access_token) {
            return res.redirect('/dashboard');
        }
        return { title: 'ثبت نام' };
    }
    async getDashboard(req) {
        console.log('dashboard::');
        const user = req.user;
        if (user) {
            return { title: 'داشبورد', user, currentPath: '/dashboard' };
        }
    }
    async getDashboardData(req) {
        console.log('dashboard::');
        const user = req.user;
        if (user) {
            const result = await this.webservice.getUserDashboard(user.id);
            console.log("resultttt", result);
            return result;
        }
    }
    landing(req) {
        console.log('panel', req.user);
        return {
            title: 'Plant Monitoring System',
            user: req.user || null,
        };
    }
    test() {
        return 'ok';
    }
};
exports.WebController = WebController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('login'),
    (0, common_1.Render)('auth/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "getLoginPage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('register'),
    (0, common_1.Render)('auth/register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "getRegisterPage", null);
__decorate([
    (0, common_1.UseGuards)(web_jwt_auth_guard_1.WebJwtAuthGuard),
    (0, common_1.Get)('dashboard'),
    (0, common_1.Render)('dashboard/index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.UseGuards)(web_jwt_auth_guard_1.WebJwtAuthGuard),
    (0, common_1.Get)('getDashboardData'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "getDashboardData", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/'),
    (0, common_1.Render)('landing/index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "landing", null);
__decorate([
    (0, common_1.Get)('/test'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebController.prototype, "test", null);
exports.WebController = WebController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [web_service_1.WebService])
], WebController);
//# sourceMappingURL=web.controller.js.map
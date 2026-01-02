"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const winston = require("winston");
const path = require("path");
const logTypes_enum_1 = require("../types/logTypes.enum");
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || logTypes_enum_1.LogTypes.INFO,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.File({
            filename: path.join(process.env.LOG_DIR || './logs', 'combined.log'),
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    ],
});
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user } = request;
        const now = Date.now();
        logger.info({
            type: 'request',
            method,
            url,
            userId: user?.id || 'anonymous',
            body: this.sanitizeBody(body),
        });
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const response = context.switchToHttp().getResponse();
                logger.info({
                    type: 'response',
                    method,
                    url,
                    statusCode: response.statusCode,
                    userId: user?.id || 'anonymous',
                    duration: `${Date.now() - now}ms`,
                });
            },
            error: (error) => {
                logger.error({
                    type: 'error',
                    method,
                    url,
                    userId: user?.id || 'anonymous',
                    error: error.message,
                    stack: error.stack,
                    duration: `${Date.now() - now}ms`,
                });
            },
        }));
    }
    sanitizeBody(body) {
        if (!body)
            return body;
        const sanitized = { ...body };
        const sensitiveFields = ['password', 'token', 'tokenHash'];
        sensitiveFields.forEach(field => {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        });
        return sanitized;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
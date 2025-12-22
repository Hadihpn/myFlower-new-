import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as winston from 'winston';
import * as path from 'path';
import { LogTypes } from '../types/logTypes.enum';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || LogTypes.INFO,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(process.env.LOG_DIR || './logs', 'combined.log'),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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

    return next.handle().pipe(
      tap({
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
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'tokenHash'];
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });
    
    return sanitized;
  }
}
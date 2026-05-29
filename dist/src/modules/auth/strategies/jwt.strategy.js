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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
            passReqToCallback: true
        });
        this.configService = configService;
        this.userRepository = userRepository;
        console.log('✅ JwtStrategy initialized');
        console.debug(`JWT Secret configured: ${configService.get('jwt.secret')?.substring(0, 10)}...`);
    }
    async validate(req, payload) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔐 JWT Validation Started');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.debug('📦 Received JWT Payload:');
        console.debug(JSON.stringify(payload, null, 2));
        console.debug(`   - User ID (sub): ${payload.sub}`);
        console.debug(`   - Email: ${payload.email}`);
        console.log(`🔍 Searching for user with ID: ${payload.sub}`);
        console.log(`🔍 Searching for user with ID: ${req}`);
        let user;
        try {
            user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (user) {
                console.log('✅ User found in database');
                console.debug(`   - ID: ${user.id}`);
                console.debug(`   - Email: ${user.email}`);
                console.debug(`   - Role: ${user.role}`);
                console.debug(`   - Full Name: ${user.fullName}`);
            }
            else {
                console.error('❌ User NOT found in database');
                console.error(`   - Searched ID: ${payload.sub}`);
                console.error('   - Possible reasons:');
                console.error('     1. User was deleted');
                console.error('     2. Token contains invalid user ID');
                console.error('     3. Database connection issue');
            }
        }
        catch (error) {
            console.error('❌ Database query failed');
            console.error(`   - Error: ${error}`);
            throw new common_1.UnauthorizedException('Database error during authentication');
        }
        if (!user) {
            console.error('🚫 Authentication FAILED - throwing UnauthorizedException');
            throw new common_1.UnauthorizedException('User not found');
        }
        const validatedUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
        };
        console.log('✅ JWT Validation SUCCESSFUL');
        console.debug('📤 Returning validated user object:');
        console.debug(JSON.stringify(validatedUser, null, 2));
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        return validatedUser;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map
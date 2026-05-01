"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashUtil = void 0;
const bcrypt = require("bcryptjs");
class HashUtil {
    static async hash(plainText) {
        return bcrypt.hash(plainText, this.SALT_ROUNDS);
    }
    static async compare(plainText, hash) {
        return bcrypt.compare(plainText, hash);
    }
    static generateRandomToken(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }
}
exports.HashUtil = HashUtil;
HashUtil.SALT_ROUNDS = 10;
//# sourceMappingURL=hash.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxFileSize = exports.imageFileFilter = exports.packageImageStorage = exports.plantImageStorage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
exports.plantImageStorage = (0, multer_1.diskStorage)({
    destination: './uploads/plants',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `plant-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
    },
});
exports.packageImageStorage = (0, multer_1.diskStorage)({
    destination: './uploads/packages',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `package-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
    },
});
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
exports.maxFileSize = 5 * 1024 * 1024;
//# sourceMappingURL=multer.config.js.map
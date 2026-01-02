"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
const fs = require("fs");
const path = require("path");
class FileUtil {
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
    static deleteFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    static getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }
    static isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        return imageExtensions.includes(this.getFileExtension(filename));
    }
    static generateUniqueFilename(originalName) {
        const ext = this.getFileExtension(originalName);
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${timestamp}-${random}${ext}`;
    }
    static getFileSizeInMB(fileSizeInBytes) {
        return fileSizeInBytes / (1024 * 1024);
    }
}
exports.FileUtil = FileUtil;
//# sourceMappingURL=file.util.js.map
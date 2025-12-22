import * as fs from 'fs';
import * as path from 'path';

export class FileUtil {
  static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  static getFileExtension(filename: string): string {
    return path.extname(filename).toLowerCase();
  }

  static isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.includes(this.getFileExtension(filename));
  }

  static generateUniqueFilename(originalName: string): string {
    const ext = this.getFileExtension(originalName);
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}-${random}${ext}`;
  }

  static getFileSizeInMB(fileSizeInBytes: number): number {
    return fileSizeInBytes / (1024 * 1024);
  }
}

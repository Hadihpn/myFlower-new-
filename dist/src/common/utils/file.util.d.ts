export declare class FileUtil {
    static ensureDirectoryExists(dirPath: string): void;
    static deleteFile(filePath: string): boolean;
    static getFileExtension(filename: string): string;
    static isImageFile(filename: string): boolean;
    static generateUniqueFilename(originalName: string): string;
    static getFileSizeInMB(fileSizeInBytes: number): number;
}

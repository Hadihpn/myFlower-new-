import { Request } from 'express';
export declare const plantImageStorage: import("multer").StorageEngine;
export declare const packageImageStorage: import("multer").StorageEngine;
export declare const imageFileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export declare const maxFileSize: number;

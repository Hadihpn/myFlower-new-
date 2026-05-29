import { Request } from 'express';
export declare const plantImageStorage: any;
export declare const packageImageStorage: any;
export declare const imageFileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export declare const maxFileSize: number;

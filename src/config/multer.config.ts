import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

// Plant Images Storage
export const plantImageStorage = diskStorage({
  destination: './uploads/plants',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `plant-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

// Package Images Storage
export const packageImageStorage = diskStorage({
  destination: './uploads/packages',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `package-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

// Image File Filter
export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

// Max File Size (5MB)
export const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

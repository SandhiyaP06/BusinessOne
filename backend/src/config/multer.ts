import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from './env';

// Ensure uploads folder exists
const uploadPath = path.resolve(config.uploadDir);
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedExt = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, sanitizedExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${safeBase}-${uniqueSuffix}${sanitizedExt}`);
  }
});

const allowedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/zip',
  'application/x-zip-compressed',
  'application/acad',
  'image/vnd.dwg'
];

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype) || file.originalname.endsWith('.dwg') || file.originalname.endsWith('.pdf')) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: PDF, DWG, PNG, JPEG, ZIP`));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSizeMB * 1024 * 1024 // e.g. 25 MB
  },
  fileFilter
});

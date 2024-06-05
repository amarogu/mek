import multer from 'multer';

export const upload = multer({dest: '../../uploads', limits: {fileSize: 40000000}});
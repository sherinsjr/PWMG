import multer from 'multer';

// Set storage engine
const storage = multer.memoryStorage(); // or multer.diskStorage() if you want to save it locally first

// Initialize upload
export const upload = multer({ storage });

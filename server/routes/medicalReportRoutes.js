import express from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import { upload } from '../utils/multer.js';
import { medicalReportController } from '../controllers/medicalReportController.js';

const medicalReportRoute = express.Router();

// Create a medical report
medicalReportRoute.post(
  '/create',
  authenticate.user,
  upload.single('report'),
  medicalReportController.createReport
);

// Get all medical reports (Admin only)
medicalReportRoute.get(
  '/all',
  authenticate.admin,
  medicalReportController.getAllReports
);

// Get reports created by the logged-in user
medicalReportRoute.get(
  '/my-reports',
  authenticate.user,
  medicalReportController.getMyReports
);

// Update report with doctor remarks and suggested products
medicalReportRoute.put(
  '/update/:reportId',
  authenticate.doctor,
  medicalReportController.updateReportByDoctor
);

// Delete a medical report
medicalReportRoute.delete(
  '/delete/:reportId',
  authenticate.user,
  medicalReportController.deleteReport
);

export default medicalReportRoute;

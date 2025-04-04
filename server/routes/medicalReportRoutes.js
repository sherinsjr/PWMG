import express from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import { upload } from '../utils/multer.js';
import { medicalReportController } from '../controllers/medicalReportController.js';

const medicalReportRoute = express.Router();

// Create a medical report
medicalReportRoute
  .route('/create')
  .post(
    authenticate.user,
    upload.single('report'),
    medicalReportController.createReport
  );

// Get all medical reports (Admin only)
medicalReportRoute
  .route('/all')
  .get(authenticate.user, medicalReportController.getAllReports);

// Get reports created by the logged-in user
medicalReportRoute
  .route('/my-reports')
  .get(authenticate.user, medicalReportController.getMyReports);

// Update report with doctor remarks and suggested products
medicalReportRoute
  .route('/update/:reportId')
  .put(authenticate.user, medicalReportController.updateReportByDoctor);

// Delete a medical report
medicalReportRoute
  .route('/delete/:reportId')
  .delete(authenticate.user, medicalReportController.deleteReport);

export default medicalReportRoute;

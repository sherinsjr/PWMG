import express from 'express';
import userRoutes from './userRoutes.js';
import medicalReportRoute from './medicalReportRoutes.js';
const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/report', medicalReportRoute);

export default routes;

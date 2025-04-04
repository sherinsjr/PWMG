import express from 'express';
import userRoutes from './userRoutes.js';
import medicalReportRoute from './medicalReportRoutes.js';
import clientRoute from './clientRoute.js';
const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/report', medicalReportRoute);
routes.use('/client', clientRoute);

export default routes;

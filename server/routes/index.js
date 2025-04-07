import express from 'express';
import userRoutes from './userRoutes.js';
import medicalReportRoute from './medicalReportRoutes.js';
import clientRoute from './clientRoute.js';
import workoutsRoutes from './workoutRouts.js';
import workoutsPlanRoutes from './workoutPlanRoute.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/report', medicalReportRoute);
routes.use('/client', clientRoute);
routes.use('/workout', workoutsRoutes);
routes.use('/workout-plan', workoutsPlanRoutes);

export default routes;

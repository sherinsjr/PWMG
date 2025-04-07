import express from 'express';
import { workoutPlanController } from '../controllers/index.js'
import authenticate from '../middlewares/authMiddleware.js';

const workoutsPlanRoutes = express.Router();

// Create a new workout plan (authenticated user - trainer/nutritionist)
workoutsPlanRoutes
  .route('/create')
  .post(authenticate.user, workoutPlanController.createWorkoutPlan);

// Get all workout plans (optionally filtered by query: assignedTo / assignedBy)
workoutsPlanRoutes
  .route('/')
  .get(authenticate.user, workoutPlanController.getWorkoutPlans);

// Get workout plan by ID
workoutsPlanRoutes
  .route('/:planId')
  .get(authenticate.user, workoutPlanController.getWorkoutPlanById);

// Update a workout plan
workoutsPlanRoutes
  .route('/:planId')
  .put(authenticate.user, workoutPlanController.updateWorkoutPlan);

// Delete a workout plan
workoutsPlanRoutes
  .route('/:planId')
  .delete(authenticate.user, workoutPlanController.deleteWorkoutPlan);



export default workoutsPlanRoutes;

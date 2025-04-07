import express from 'express';
import { workoutController } from '../controllers/index.js';
import { upload } from '../utils/multer.js';

const workoutsRoutes = express.Router();

// POST: Create a new workout with an image upload
workoutsRoutes.post(
  '/',
  upload.single('workoutImage'),
  workoutController.createWorkout
);

// GET: Retrieve all workouts
workoutsRoutes.get('/', workoutController.getWorkouts);

workoutsRoutes.get(
  '/category/:category',
  workoutController.getWorkoutByCategory
);

//GET: Retrieve a workout by ID
workoutsRoutes.get('/:workoutId', workoutController.getWorkoutById);

// PUT: Update a workout by ID
workoutsRoutes.put(
  '/update/:id',
  upload.single('workoutImage'),
  workoutController.updateWorkout
);

// DELETE: Delete a workout by ID
workoutsRoutes.delete('/delete/:workoutId', workoutController.deleteWorkout);

// Error handling middleware (optional but recommended)
workoutsRoutes.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

export default workoutsRoutes;

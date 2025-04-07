import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Workout } from '../models/index.js';

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all workouts
const getWorkoutById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById({ _id: workoutId });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error?.message);

    res.status(500).json({ message: error.message });
  }
};

// Get all workouts
const getWorkoutByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const workouts = await Workout.find({ category: category });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const {
    workoutName,
    category,
    recommendedSets,
    recommendedReps,
    intensityLevel,
    duration,
    targetMuscles,
    equipment,
    caloriesBurned,
    level,
    description,
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a readable stream from the buffer
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    // Upload workout image to Cloudinary directly from the buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'workoutsImages', width: 150, crop: 'scale' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferStream.pipe(uploadStream);
    });

    const newWorkout = new Workout({
      workoutName,
      category,
      recommendedSets,
      recommendedReps,
      intensityLevel,
      duration,
      targetMuscles,
      equipment,
      caloriesBurned,
      level,
      description,
      workoutImage: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.log('error', error?.message);

    res.status(500).json({ message: error.message });
  }
};

// Update an existing workout
const updateWorkout = async (req, res) => {
  const {
    workoutName,
    category,
    recommendedSets,
    recommendedReps,
    intensityLevel,
    duration,
    targetMuscles,
    equipment,
    caloriesBurned,
    level,
    description,
  } = req.body;

  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Update workout image if provided
    if (req.file) {
      // Remove old image
      await cloudinary.uploader.destroy(workout.workoutImage.public_id);

      // Upload new image
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'workoutsImages', width: 150, crop: 'scale' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      workout.workoutImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    // Update workout details
    workout.workoutName = workoutName || workout.workoutName;
    workout.category = category || workout.category;
    workout.recommendedSets = recommendedSets || workout.recommendedSets;
    workout.recommendedReps = recommendedReps || workout.recommendedReps;
    workout.intensityLevel = intensityLevel || workout.intensityLevel;
    workout.duration = duration || workout.duration;
    workout.targetMuscles = targetMuscles || workout.targetMuscles;
    workout.equipment = equipment || workout.equipment;
    workout.caloriesBurned = caloriesBurned || workout.caloriesBurned;
    workout.level = level || workout.level;
    workout.description = description || workout.description;

    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Remove the image from Cloudinary
    await cloudinary.uploader.destroy(workout.workoutImage.public_id);

    // Delete the workout from the database
    await workout.deleteOne();

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.log(error?.message);

    res.status(500).json({ message: error.message });
  }
};

export const workoutController = {
  createWorkout,
  deleteWorkout,
  getWorkoutByCategory,
  getWorkoutById,
  getWorkouts,
  updateWorkout,
};

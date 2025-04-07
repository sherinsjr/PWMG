import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    recommendedSets: {
      type: String,
    },
    recommendedReps: {
      type: String,
    },
    workoutImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    intensityLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    duration: {
      type: Number,
      default: 30,
    },
    targetMuscles: {
      type: [String],
    },
    equipment: {
      type: [String],
      default: ['None'],
    },
    caloriesBurned: {
      type: Number,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;

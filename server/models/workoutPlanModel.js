import mongoose from 'mongoose';

const workoutPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming trainer is a User
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client', // assuming client model is named 'Client'
      required: true,
    },
    workouts: [
      {
        workout: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Workout',
          required: true,
        },
        day: {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          required: true,
        },
        notes: {
          type: String,
        },
      },
    ],
    durationInWeeks: {
      type: Number,
      default: 4,
    },
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

export default WorkoutPlan;

import mongoose from 'mongoose';

const clientSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'please enter a first name'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'please enter an email'],
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: [true, 'please enter a phone number'],
    },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    weight: { type: Number }, // in kg
    height: { type: Number }, // in cm
    goals: { type: String },
    personalTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    prefferedWorkoutPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlannedWorkout',
    },
    feeDetails: [
      {
        planName: { type: String },
        planAmount: { type: Number },
        paymentStatus: { type: String, enum: ['Paid', 'Unpaid'] },
        paymentRecievedDate: { type: Date },
        paymentDueDate: { type: Date },
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Client = mongoose.model('Client', clientSchema);

export default Client;

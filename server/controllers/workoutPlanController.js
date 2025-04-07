import { WorkoutPlan } from '../models/index.js';

const createWorkoutPlan = async (req, res) => {
  try {
    const { planName, description, assignedTo, workouts, durationInWeeks } =
      req.body;

    const assignedBy = req.user._id;

    if (
      !planName ||
      !assignedTo ||
      !Array.isArray(workouts) ||
      workouts.length === 0
    ) {
      return res
        .status(400)
        .json({ message: 'Required fields are missing or invalid' });
    }

    const newPlan = new WorkoutPlan({
      planName,
      description,
      assignedBy,
      assignedTo,
      workouts,
      durationInWeeks,
    });

    const savedPlan = await newPlan.save();

    res.status(201).json({
      status: 'success',
      message: 'Workout plan created successfully',
      workoutPlan: savedPlan,
    });
  } catch (error) {
    console.error('Error creating workout plan:', error.message);
    res
      .status(500)
      .json({ message: 'Failed to create workout plan', error: error.message });
  }
};

const getWorkoutPlans = async (req, res) => {
  try {
    const filter = {};
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    if (req.query.assignedBy) filter.assignedBy = req.query.assignedBy;

    const plans = await WorkoutPlan.find(filter)
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('workouts.workout');

    res.status(200).json(plans);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch workout plans', error: error.message });
  }
};

const getWorkoutPlanById = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await WorkoutPlan.findById(planId)
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('workouts.workout');

    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching workout plan', error: error.message });
  }
};

const updateWorkoutPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const updates = req.body;

    const updatedPlan = await WorkoutPlan.findByIdAndUpdate(planId, updates, {
      new: true,
    })
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('workouts.workout');

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Workout plan updated',
      workoutPlan: updatedPlan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update workout plan', error: error.message });
  }
};

const deleteWorkoutPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    await plan.deleteOne();

    res.status(200).json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete workout plan', error: error.message });
  }
};

export const workoutPlanController = {
  createWorkoutPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};

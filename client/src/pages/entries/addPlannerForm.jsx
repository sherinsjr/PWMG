import { useState, useEffect } from 'react';
import {
  Button,
  chakra,
  Flex,
  useToast,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Select,
} from '@chakra-ui/react';
import axiosInstance from '../../config/axios';
import { useUserData } from '../../contexts/userContext';
import PropTypes from 'prop-types';

const AddPlannerForm = ({ onClose }) => {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user } = useUserData();
  const userId = user?._id;

  // Hardcoded workout categories
  const categories = [
    'Chest',
    'Biceps',
    'Back',
    'Legs',
    'Shoulder',
    'Abs',
    'Triceps',
  ];

  useEffect(() => {
    // Fetch available meals
    const fetchMeals = async () => {
      try {
        const mealRes = await axiosInstance.get('/meals/');
        setMeals(mealRes.data);
      } catch (error) {
        toast({
          title: 'Error fetching data',
          description: 'Unable to load meals',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchMeals();
  }, []);

  // Fetch workouts based on selected category
  const fetchWorkoutsByCategory = async (category) => {
    try {
      const workoutRes = await axiosInstance.get(
        `/workout/category/${category}`
      );
      setWorkouts(workoutRes.data);
      console.log(workoutRes.data);
    } catch (error) {
      toast({
        title: 'Error fetching workouts',
        description: 'Unable to load workouts for the selected category',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { day } = e.target.elements;
      const response = await axiosInstance.post(`/planner/${userId}`, {
        day: day.value,
        workout: selectedWorkouts,
        meal: selectedMeals,
      });

      if (response.status === 201) {
        toast({
          title: 'Planner Created',
          description: 'Your planner was successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        e.target.reset();
        setSelectedWorkouts([]);
        setSelectedMeals([]);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to create planner. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // Handle workout selection
  const handleWorkoutChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedWorkouts((prev) => [...prev, value]);
    } else {
      setSelectedWorkouts((prev) => prev.filter((id) => id !== value));
    }
  };

  // Handle meal selection
  const handleMealChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMeals((prev) => [...prev, value]);
    } else {
      setSelectedMeals((prev) => prev.filter((id) => id !== value));
    }
  };

  return (
    <Flex
      as={chakra.form}
      w='full'
      maxW='30rem'
      direction='column'
      gap='4'
      onSubmit={handleSubmit}
    >
      <FormControl isRequired>
        <FormLabel>Day</FormLabel>
        <Input type='text' name='day' placeholder='Enter day (e.g., Monday)' />
      </FormControl>

      {/* Select Workout Category */}
      <FormControl isRequired>
        <FormLabel>Workout Category</FormLabel>
        <Select
          placeholder='Select category'
          onChange={(e) => fetchWorkoutsByCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Workouts based on selected category */}
      <FormControl>
        <FormLabel>Select Workouts</FormLabel>
        <Stack spacing={3}>
          {workouts.map((workout) => (
            <Checkbox
              key={workout._id}
              value={workout._id}
              onChange={handleWorkoutChange}
            >
              {workout.workoutName}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>

      {/* Meals Selection */}
      <FormControl>
        <FormLabel>Select Meals</FormLabel>
        <Stack spacing={3}>
          {meals.map((meal) => (
            <Checkbox
              key={meal._id}
              value={meal._id}
              onChange={handleMealChange}
            >
              {meal.mealName}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>

      <Button
        type='submit'
        colorScheme='blue'
        isLoading={isLoading}
        loadingText='Creating Planner'
      >
        Create Planner
      </Button>
    </Flex>
  );
};
AddPlannerForm.propTypes = {
  onClose: PropTypes.any,
};

export default AddPlannerForm;

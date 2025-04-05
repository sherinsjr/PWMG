import { useState } from 'react';
import {
  Button,
  chakra,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const CreateWorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [category, setCategory] = useState('');
  const [recommendedSets, setRecommendedSets] = useState();
  const [recommendedReps, setRecommendedReps] = useState();
  const [intensityLevel, setIntensityLevel] = useState('');
  const [duration, setDuration] = useState();
  const [targetMuscles, setTargetMuscles] = useState('');
  const [equipment, setEquipment] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState();
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Hardcoded workout categories
  const categories = [
    'Chest',
    'Biceps',
    'Back',
    'Legs',
    'Shoulders',
    'Abs',
    'Triceps',
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('workoutName', workoutName);
    formData.append('category', category);
    formData.append('recommendedSets', recommendedSets);
    formData.append('recommendedReps', recommendedReps);
    formData.append('intensityLevel', intensityLevel);
    formData.append('duration', duration);
    formData.append('targetMuscles', targetMuscles);
    formData.append('equipment', equipment);
    formData.append('caloriesBurned', caloriesBurned);
    formData.append('level', level);
    formData.append('description', description);
    if (imageFile) {
      formData.append('workoutImage', imageFile);
    }

    try {
      const response = await axiosInstance.post('/workout', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast({
          title: 'Workout Created',
          description: 'Your workout was successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(`/user/workoutlibrary/workout?workout=${category}`);
        // Reset form fields
        setWorkoutName('');
        setCategory('');
        setRecommendedSets(0);
        setRecommendedReps(0);
        setIntensityLevel('');
        setDuration(0);
        setTargetMuscles('');
        setEquipment('');
        setCaloriesBurned(0);
        setLevel('');
        setDescription('');
        setImageFile(null);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to create workout. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      as={chakra.form}
      w='full'
      // maxW="30rem"
      direction='column'
      gap='4'
      onSubmit={handleSubmit}
      maxH='80rem'
    >
      <Flex gap='4'>
        <FormControl isRequired>
          <FormLabel>Workout Name</FormLabel>
          <Input
            type='text'
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder='Select category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Workout Image</FormLabel>
          <Input
            type='file'
            accept='image/*'
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </FormControl>
      </Flex>

      <Flex gap='4'>
        <FormControl isRequired>
          <FormLabel>Recommended Sets</FormLabel>
          <Input
            type='number'
            value={recommendedSets}
            onChange={(e) => setRecommendedSets(Number(e.target.value))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Recommended Reps</FormLabel>
          <Input
            type='number'
            value={recommendedReps}
            onChange={(e) => setRecommendedReps(Number(e.target.value))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Intensity Level</FormLabel>
          {/* <Input
            type="text"
            value={intensityLevel}
            onChange={(e) => setIntensityLevel(e.target.value)}
          /> */}
          <Select
            placeholder='Select Level'
            value={intensityLevel}
            onChange={(e) => setIntensityLevel(e.target.value)}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Duration (in minutes)</FormLabel>
          <Input
            type='number'
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </FormControl>
      </Flex>

      <Flex gap='4'>
        <FormControl>
          <FormLabel>Equipment</FormLabel>
          <Input
            type='text'
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Calories Burned</FormLabel>
          <Input
            type='number'
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(Number(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Level</FormLabel>
          {/* <Input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          /> */}
          <Select
            placeholder='Select Level'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
          </Select>
        </FormControl>
      </Flex>

      <Flex gap='4'>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Target Muscles</FormLabel>
          <Input
            type='text'
            value={targetMuscles}
            onChange={(e) => setTargetMuscles(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Button
        type='submit'
        colorScheme='blue'
        isLoading={isLoading}
        loadingText='Creating Workout'
      >
        Create Workout
      </Button>
    </Flex>
  );
};

export default CreateWorkoutForm;

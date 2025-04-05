import { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const UpdateWorkoutForm = () => {
  const { workoutId } = useParams(); // Get workout ID from URL params
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

  const categories = ['Chest', 'Biceps', 'Back', 'Legs', 'Shoulders', 'Abs'];
  console.log(workoutId);

  // Fetch workout details on component mount
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axiosInstance.get(`/workout/${workoutId}`);
        console.log(response);

        const data = response.data;
        setWorkoutName(data.workoutName);
        setCategory(data.category);
        setRecommendedSets(data.recommendedSets);
        setRecommendedReps(data.recommendedReps);
        setIntensityLevel(data.intensityLevel);
        setDuration(data.duration);
        setTargetMuscles(data.targetMuscles);
        setEquipment(data.equipment);
        setCaloriesBurned(data.caloriesBurned);
        setLevel(data.level);
        setDescription(data.description);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not fetch workout details.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchWorkout();
  }, [workoutId, toast]);

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
      const response = await axiosInstance.put(
        `/workout/update/${workoutId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: 'Workout Updated',
          description: 'Your workout was successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(`/user/workoutlibrary/workout?workout=${category}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to update workout. Please try again.',
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
        loadingText='Updating Workout'
      >
        Update Workout
      </Button>
    </Flex>
  );
};

export default UpdateWorkoutForm;

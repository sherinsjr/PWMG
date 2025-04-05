import {
  Flex,
  Heading,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from '../../config/axios';
import { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/userContext';
import CustomTable from './entriesTable';
import ProgressModal from './progressModal'; // Import the new ProgressModal component

const Entries = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the progress modal
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Store selected workout for progress tracking

  const toast = useToast();
  const { user } = useUserData();
  const userId = user?._id;

  // Predefined days of the week
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userId) {
        setLoading(true); // Set loading true
        try {
          const response = await axiosInstance.get(`/planner/${userId}`);
          const fetchedWorkouts = response?.data?.planners;
          // Merge fetched workouts with days of the week
          const mergedWorkouts = daysOfWeek.map((day) => {
            const workoutForDay = fetchedWorkouts.find(
              (workout) => workout.day === day
            );
            return (
              workoutForDay || {
                day,
                workout: [],
                meal: [],
              }
            );
          });

          setWorkouts(mergedWorkouts);
        } catch (error) {
          console.log(error?.message);

          toast({
            title: 'Error',
            description: 'Failed to fetch workouts',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setWorkouts(
            daysOfWeek.map((day) => ({ day, workout: [], meal: [] }))
          ); // Changed workout and meal to arrays
        } finally {
          setLoading(false); // Set loading false
        }
      }
    };

    fetchWorkouts();
  }, [userId, toast]);

  const handleTrackProgress = (workout) => {
    setSelectedWorkout(workout);
    onOpen();
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Planner</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        alignItems='center'
        justify='center'
      >
        {loading ? (
          <Spinner alignItems='center' thickness='0.6rem' w='6rem' h='6rem' />
        ) : (
          <CustomTable
            columns={['Day', 'Workout', 'Meal', 'Actions']}
            data={workouts}
            actions={{ handleTrackProgress }} // Pass the progress tracking function
          />
        )}
      </Flex>

      {selectedWorkout && (
        <ProgressModal
          isOpen={isOpen}
          onClose={onClose}
          workout={selectedWorkout}
        />
      )}
    </Flex>
  );
};

export default Entries;

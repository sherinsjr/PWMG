import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Tag,
  Divider,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';

const WorkoutDetailsView = ({ workoutId }) => {
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(true); // Start with loading as true

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/workout/${workoutId}`);
        const data = response.data;
        setWorkout(data);
      } catch (error) {
        console.log(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [workoutId]);

  if (loading) {
    return (
      <Flex align='center' justify='center' height='300px'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex
      direction='column'
      align='center'
      p='6'
      w='full'
      maxW='900px'
      mx='auto'
      bg='white'
      borderRadius='lg'
      boxShadow='xl'
    >
      <Heading size='lg' mb='4'>
        {workout?.workoutName || 'Unnamed Workout'}
      </Heading>

      {workout?.workoutImage?.url ? (
        <Image
          src={workout.workoutImage.url}
          alt={workout?.workoutName || 'Workout Image'}
          borderRadius='md'
          boxSize='10rem'
          objectFit='cover'
          boxShadow='md'
          mb='6'
        />
      ) : (
        <Box
          boxSize='10rem'
          bg='gray.200'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius='md'
          mb='6'
        >
          <Text color='gray.500'>No Image Available</Text>
        </Box>
      )}

      <VStack align='start' w='full' spacing='4'>
        <Flex justify='space-between' w='full'>
          <Tag size='lg' colorScheme='blue' borderRadius='full' px='4'>
            {workout?.category || 'Unknown Category'}
          </Tag>
          <Tag size='lg' colorScheme='orange' borderRadius='full' px='4'>
            {workout?.level || 'Unknown Level'}
          </Tag>
          <Tag size='lg' colorScheme='green' borderRadius='full' px='4'>
            Intensity: {workout?.intensityLevel || 'Unknown'}
          </Tag>
        </Flex>

        <Box w='full' mt='4'>
          <Text fontSize='md' color='gray.600'>
            {workout?.description || 'No description available'}
          </Text>
        </Box>

        <Divider />

        <Stack direction={['column', 'row']} spacing='6' w='full' mt='4'>
          <Box flex='1'>
            <Heading as='h3' size='sm' mb='2'>
              Recommended Sets & Reps
            </Heading>
            <Text fontSize='lg'>
              {workout?.recommendedSets || 0} sets of{' '}
              {workout?.recommendedReps || 0} reps
            </Text>
          </Box>

          <Box flex='1'>
            <Heading as='h3' size='sm' mb='2'>
              Duration
            </Heading>
            <Text fontSize='lg'>
              {workout?.duration
                ? `${workout.duration} minutes`
                : 'Not specified'}
            </Text>
          </Box>

          <Box flex='1'>
            <Heading as='h3' size='sm' mb='2'>
              Calories Burned
            </Heading>
            <Text fontSize='lg'>
              {workout?.caloriesBurned
                ? `${workout.caloriesBurned} kcal`
                : 'Not specified'}
            </Text>
          </Box>
        </Stack>

        <Divider />

        <Stack direction={['column', 'row']} spacing='6' w='full' mt='4'>
          <Box flex='1'>
            <Heading as='h3' size='sm' mb='2'>
              Target Muscles
            </Heading>
            <Text fontSize='lg'>
              {workout?.targetMuscles?.length
                ? workout.targetMuscles.join(', ')
                : 'None specified'}
            </Text>
          </Box>

          <Box flex='1'>
            <Heading as='h3' size='sm' mb='2'>
              Equipment Needed
            </Heading>
            <Text fontSize='lg'>
              {workout?.equipment?.length
                ? workout.equipment.join(', ')
                : 'No equipment required'}
            </Text>
          </Box>
        </Stack>

        <Divider />

        <Text fontSize='sm' color='gray.500' mt='4' alignSelf='flex-end'>
          Created on:{' '}
          {workout?.createdAt
            ? new Date(workout.createdAt).toLocaleDateString()
            : 'Unknown'}
        </Text>
      </VStack>
    </Flex>
  );
};

export default WorkoutDetailsView;

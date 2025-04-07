import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  Image,
  Divider,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';

const WorkoutPlanViewPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axiosInstance.get(`/workout-plan/${id}`);
        setPlan(res.data);
        console.log(res.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch workout plan',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  if (loading) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  if (!plan) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Text>Workout Plan not found.</Text>
      </Flex>
    );
  }

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Workout Plan</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='10'
      >
        <Flex p='6' flexWrap='wrap' flexDirection='column'>
          <Heading mb='4'>{plan.planName}</Heading>
          <Text fontSize='sm' color='gray.500'>
            Created: {new Date(plan.createdAt).toLocaleDateString()}
          </Text>
          <Text fontSize='md' mt='2'>
            <strong>Duration:</strong> {plan.durationInWeeks} weeks
          </Text>
          <Text fontSize='md'>
            <strong>Assigned Client:</strong> {plan?.assignedTo?.name || 'ROSHAN'}
          </Text>
          <Text fontSize='md' mb='6'>
            <strong>Assigned Trainer:</strong> {plan?.assignedBy?.name || 'Trainer 1'}
          </Text>

          <Divider mb='6' />

          <Heading size='md' mb='4'>
            Workouts Included
          </Heading>

          <Stack spacing='6'>
            {plan.workouts.length === 0 ? (
              <Text>No workouts assigned in this plan.</Text>
            ) : (
              plan.workouts.map((workout) => (
                <Flex
                  key={workout._id}
                  p='4'
                  bg='white'
                  rounded='md'
                  shadow='sm'
                  border='1px solid #eee'
                  gap='4'
                  align='center'
                  _hover={{ shadow: 'md' }}
                >
                  {workout.image && (
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      boxSize='100px'
                      objectFit='cover'
                      rounded='md'
                    />
                  )}
                  <Box>
                    <Text fontWeight='bold'>{workout.name}</Text>
                    <Text fontSize='sm' color='gray.600'>
                      Category: {workout.category}
                    </Text>
                  </Box>
                </Flex>
              ))
            )}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorkoutPlanViewPage;

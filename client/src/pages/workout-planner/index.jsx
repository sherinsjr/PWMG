import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  Spinner,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios';

const WorkoutPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get('/workout-plan');
        setPlans(res.data);
      } catch (error) {
        console.log(error?.message);

        toast({
          title: 'Error',
          description: 'Failed to load workout plans',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Workout Plans</Heading>
      <Flex
        w='full'
        h='full'
        bg='#D9D9D9'
        rounded='1rem'
        p='10'
        direction='column'
      >
        <Button
          size='sm'
          mt='4'
          w='9rem'
          colorScheme='teal'
          onClick={() => navigate(`/user/workout-plan/create`)}
        >
          Create New Plan
        </Button>
        <Flex p='6' flexWrap='wrap'>
          <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap='6'>
            {plans.map((plan) => (
              <Box
                key={plan._id}
                bg='white'
                p='6'
                rounded='xl'
                shadow='md'
                border='1px solid #ddd'
                transition='all 0.2s'
                _hover={{ shadow: 'xl' }}
                h='15rem'
              >
                <Heading size='md' mb='2'>
                  {plan.planName}
                </Heading>
                <Text fontSize='sm' color='gray.600'>
                  <strong>Client:</strong> {plan?.assignedTo?.name || 'ROSHAN'}
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  <strong>Trainer:</strong>{' '}
                  {plan?.assignedBy?.name || 'Trainer 1'}
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  <strong>Duration:</strong> {plan.durationInWeeks} weeks
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  <strong>Workouts:</strong> {plan.workouts.length}
                </Text>
                <Text fontSize='sm' color='gray.500' mt='2'>
                  Created: {new Date(plan.createdAt).toLocaleDateString()}
                </Text>
                <Button
                  size='sm'
                  mt='4'
                  colorScheme='teal'
                  onClick={() =>
                    navigate(`/user/workout-plan/view/${plan._id}`)
                  }
                >
                  View Details
                </Button>
              </Box>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorkoutPlansPage;

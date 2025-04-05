import { Flex, Heading } from '@chakra-ui/react';
import CreateWorkoutForm from './createWorkoutForm';

const CreateWorkout = () => {
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Create Workout</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
      >
        <Flex w='full' h='80vh' overflow='auto' p='10'>
          <CreateWorkoutForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateWorkout;

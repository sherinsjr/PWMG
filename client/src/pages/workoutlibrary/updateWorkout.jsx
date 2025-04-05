import { Flex, Heading } from '@chakra-ui/react';

import UpdateWorkoutForm from './updateWorkoutForm';

const UpdateWorkout = () => {
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Update Workout</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
      >
        <Flex w='full' h='80vh' overflow='auto' p='10'>
          <UpdateWorkoutForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UpdateWorkout;

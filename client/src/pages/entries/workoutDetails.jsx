import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import ProgressModal from './progressModal';

const WorkoutDetails = (data, plannerData) => {
  console.log(plannerData);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction='column' gap='4'>
      <Flex gap='8' fontWeight='bold'>
        <Text>Workout Name</Text>
        <Text>{data?.data?.category}</Text>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            {' '}
            {/* Wrap <Th> elements in a <Tr> */}
            <Th>WorkOuts</Th>
            <Th>Sets</Th>
            <Th>Reps</Th>
            <Th>Progress</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{data?.data?.workoutName}</Td>
            <Td>{data?.data?.recommendedSets}</Td>
            <Td>{data?.data?.recommendedReps}</Td>
            <Td>
              <Button
                variant='unstyled'
                onClick={onOpen}
                rounded='2rem'
                border='2px solid'
                w='5rem'
                h='2rem'
                borderColor='teal'
                fontSize='0.9rem'
              >
                Add
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <ProgressModal isOpen={isOpen} onClose={onClose} workout={[]} />
    </Flex>
  );
};

export default WorkoutDetails;

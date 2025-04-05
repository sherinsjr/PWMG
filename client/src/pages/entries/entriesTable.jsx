import { useState } from 'react';
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import WorkoutDetails from './workoutDetails';
import MealsDetails from './mealsDetails';
import PropTypes from 'prop-types';
import MainModal from '../../components/modal';
import AddPlannerForm from './addPlannerForm';

const CustomTable = ({ columns, data, actions }) => {
  const {
    isOpen: isWorkoutOpen,
    onOpen: onWorkoutOpen,
    onClose: onWorkoutClose,
  } = useDisclosure();
  const {
    isOpen: isMealOpen,
    onOpen: onMealOpen,
    onClose: onMealClose,
  } = useDisclosure();

  const {
    isOpen: isPlannerAddOpen,
    onOpen: onPlannerAddOpen,
    onClose: onPlannerAddClose,
  } = useDisclosure();

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedPlannerId, setSelectedPlannerId] = useState('');

  const handleSelectWorkout = (workout, data) => {
    setSelectedWorkout(workout);
    setSelectedPlannerId(data?._id);
    console.log('Setting Planner ID:', data?._id);
    onWorkoutOpen();
  };

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
    onMealOpen();
  };

  return (
    <>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {columns.map((col, index) => (
              <Th key={index}>{col}</Th>
            ))}
            {/* Add the Actions column only if it's not already included in columns */}
            {!columns.includes('Actions') && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {columns.map((col, colIndex) => (
                <Td key={colIndex}>
                  {col === 'Workout' ? (
                    row.workout.length > 0 ? (
                      <Button
                        onClick={() => handleSelectWorkout(row.workout, row)}
                      >
                        View Workout
                      </Button>
                    ) : (
                      'No Workout Selected'
                    )
                  ) : col === 'Meal' ? (
                    row.meal.length > 0 ? (
                      <Button onClick={() => handleSelectMeal(row.meal)}>
                        View Meals
                      </Button>
                    ) : (
                      'No Meal Selected'
                    )
                  ) : (
                    row[col.toLowerCase()]
                  )}
                </Td>
              ))}
              <Td>
                <Flex gap='2'>
                  <IconButton
                    aria-label='View Progress'
                    icon={<AiOutlineEye />}
                    colorScheme='green'
                    // onClick={() => actions.handleTrackProgress(row)}
                  />
                  <IconButton
                    aria-label='Edit'
                    icon={<AiOutlineEdit />}
                    colorScheme='yellow'
                    onClick={onPlannerAddOpen}
                  />
                  <IconButton
                    aria-label='Delete'
                    icon={<MdDelete />}
                    colorScheme='red'
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <MainModal onClose={onPlannerAddClose} isOpen={isPlannerAddOpen}>
        <AddPlannerForm onClose={onPlannerAddClose} />
      </MainModal>

      {/* Workout Modal */}
      <Modal isOpen={isWorkoutOpen} onClose={onWorkoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Workout Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedWorkout ? (
              <>
                {selectedWorkout.length > 0 ? (
                  selectedWorkout.map((workout, index) => (
                    <WorkoutDetails
                      key={index}
                      data={workout}
                      plannerData={selectedPlannerId}
                    />
                  ))
                ) : (
                  <Text>No Workout details available.</Text>
                )}
              </>
            ) : (
              <Text>No Workout Selected.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Meal Modal */}
      <Modal isOpen={isMealOpen} onClose={onMealClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Meal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMeal ? (
              <>
                {selectedMeal.length > 0 ? (
                  <MealsDetails meals={selectedMeal} />
                ) : (
                  <Text>No Meals details available.</Text>
                )}
              </>
            ) : (
              <Text>No Meal Selected.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
CustomTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  actions: PropTypes.any,
};
export default CustomTable;

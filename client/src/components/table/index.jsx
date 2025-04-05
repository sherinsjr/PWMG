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
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEdit } from 'react-icons/ai'; // Importing view and edit icons
import { MdDelete } from 'react-icons/md'; // Importing delete icon
import PropTypes from 'prop-types';

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

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
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
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {columns.map((col, colIndex) => (
                <Td key={colIndex}>
                  {col === 'Workout' ? (
                    row.workout.length > 0 ? (
                      <Button onClick={() => handleSelectWorkout(row.workout)}>
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
                <IconButton
                  aria-label='View Workout'
                  icon={<AiOutlineEye />}
                  onClick={() => handleSelectWorkout(row.workout)}
                />
                <IconButton
                  aria-label='View Meal'
                  icon={<AiOutlineEdit />}
                  onClick={() => handleSelectMeal(row.meal)}
                />
                <IconButton
                  aria-label='Delete'
                  icon={<MdDelete />}
                  onClick={() => actions.handleDeleteWorkout(row)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Workout Modal */}
      <Modal isOpen={isWorkoutOpen} onClose={onWorkoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Workout Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedWorkout ? (
              <div>
                {selectedWorkout.length > 0 ? (
                  selectedWorkout.map((workout) => (
                    <div key={workout._id}>
                      <p>
                        <strong>Workout Name:</strong> {workout.workoutName}
                      </p>
                      {/* Add other details as necessary */}
                    </div>
                  ))
                ) : (
                  <p>No Workout Details Available.</p>
                )}
              </div>
            ) : (
              <p>No Workout Selected.</p>
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
              <div>
                {selectedMeal.length > 0 ? (
                  selectedMeal.map((meal) => (
                    <div key={meal._id}>
                      <p>
                        <strong>Meal Name:</strong> {meal.mealName}
                      </p>
                      {/* Add other details as necessary */}
                    </div>
                  ))
                ) : (
                  <p>No Meal Details Available.</p>
                )}
              </div>
            ) : (
              <p>No Meal Selected.</p>
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

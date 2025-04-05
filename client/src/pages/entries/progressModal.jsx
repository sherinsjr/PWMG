import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import axiosInstance from '../../config/axios';
import PropTypes from 'prop-types';

const ProgressModal = ({ isOpen, onClose, workout }) => {
  const [completedSets, setCompletedSets] = useState('');
  const [completedReps, setCompletedReps] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const postData = {
        userId: workout?.userId,
        workoutId: workout?._id,
        plannerId: workout?.plannerId,
        completedSets,
        completedReps,
        notes,
      };
      console.log(workout);
      const response = await axiosInstance.post('/progress/track');

      toast({
        title: 'Progress Tracked',
        description: 'Your workout progress has been saved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to track progress.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Track Workout Progress</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Completed Sets</FormLabel>
            <Input
              type='number'
              value={completedSets}
              onChange={(e) => setCompletedSets(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Completed Reps</FormLabel>
            <Input
              type='number'
              value={completedReps}
              onChange={(e) => setCompletedReps(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Notes</FormLabel>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </FormControl>

          <Button colorScheme='blue' mt={4} onClick={handleSubmit}>
            Save Progress
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
ProgressModal.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  workout: PropTypes.any,
};

export default ProgressModal;

// src/components/WorkoutForm.js
import { useState } from 'react';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const WorkoutForm = ({ onSubmit }) => {
  const [workout, setWorkout] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout) {
      onSubmit(workout);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Select Workout</FormLabel>
        <Select
          placeholder='Select workout'
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
        >
          <option value='Chest'>Chest</option>
          <option value='Back'>Back</option>
          <option value='Legs'>Legs</option>
          <option value='Shoulders'>Shoulders</option>
          <option value='Forarms'>Forarms</option>
          <option value='Abs'>Abs</option>
        </Select>
      </FormControl>
      <Button mt={4} colorScheme='blue' type='submit'>
        Save Workout
      </Button>
    </form>
  );
};
WorkoutForm.propTypes = {
  onSubmit: PropTypes.any,
};

export default WorkoutForm;

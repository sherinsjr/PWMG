// src/components/MealForm.js
import { useState } from 'react';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MealForm = ({ onSubmit }) => {
  const [meal, setMeal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meal) {
      onSubmit(meal);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Select Meal</FormLabel>
        <Select
          placeholder='Select meal'
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        >
          <option value='Breakfast'>Breakfast</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Snacks'>Snacks</option>
        </Select>
      </FormControl>
      <Button mt={4} colorScheme='blue' type='submit'>
        Save Meal
      </Button>
    </form>
  );
};
MealForm.propTypes = {
  onSubmit: PropTypes.any,
};

export default MealForm;

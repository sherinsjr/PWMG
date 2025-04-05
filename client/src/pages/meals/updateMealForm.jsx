import { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../config/axios';
import PropTypes from 'prop-types';

const UpdateMealForm = ({ mealId, onClose }) => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [macros, setMacros] = useState('');
  const [mealImage, setMealImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axiosInstance.get(`/meals/get/${mealId}`);
        const meal = response.data;
        setMealName(meal.mealName);
        setCalories(meal.calories);
        setMacros(meal.macros);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load meal data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchMeal();
  }, [mealId, toast]);

  const handleImageChange = (e) => {
    setMealImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mealName', mealName);
    formData.append('calories', calories);
    formData.append('macros', macros);
    if (mealImage) formData.append('mealImage', mealImage);

    try {
      await axiosInstance.put(`/meals/update/${mealId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Meal updated.',
        description: 'Your meal has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update meal.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired mb={4}>
        <FormLabel>Meal Name</FormLabel>
        <Input
          type='text'
          placeholder='Meal Name'
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Calories</FormLabel>
        <Input
          type='text'
          placeholder='Calories'
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Macros</FormLabel>
        <Textarea
          placeholder='Macros (e.g., protein, carbs, fat)'
          value={macros}
          onChange={(e) => setMacros(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Meal Image (Optional)</FormLabel>
        <Input type='file' onChange={handleImageChange} />
      </FormControl>

      <Flex justify='flex-end'>
        <Button colorScheme='teal' type='submit'>
          Update Meal
        </Button>
      </Flex>
    </form>
  );
};
UpdateMealForm.propTypes = {
  mealId: PropTypes.any,
  onClose: PropTypes.any,
};
export { UpdateMealForm };

import { useState } from 'react';
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

const CreateMealForm = ({ onClose }) => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [macros, setMacros] = useState('');
  const [mealImage, setMealImage] = useState(null);
  const toast = useToast();
  const [btnLoading, setBtnLoading] = useState(false);

  const handleImageChange = (e) => {
    setMealImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append('mealName', mealName); // Meal Name
    formData.append('calories', calories); // Calories
    formData.append('macros', macros); // Macros
    formData.append('mealImage', mealImage); // The uploaded image file

    try {
      const response = await axiosInstance.post('/meals/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the content type is set
        },
      });
      setBtnLoading(false);
      // If the meal creation is successful, show success toast
      toast({
        title: 'Meal created.',
        description: 'Your meal has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setBtnLoading(false);
      console.log(error.response.data);
      toast({
        title: 'Error',
        description: 'Failed to create meal.',
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
        <FormLabel>Meal Image</FormLabel>
        <Input type='file' onChange={handleImageChange} />
      </FormControl>

      <Flex justify='flex-end'>
        <Button
          isLoading={btnLoading}
          loadingText='Creating..'
          colorScheme='teal'
          type='submit'
        >
          Create Meal
        </Button>
      </Flex>
    </form>
  );
};
CreateMealForm.propTypes = {
  onClose: PropTypes.any,
};

export { CreateMealForm };

import { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Button,
  Box,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import MainModal from '../../components/modal'; // Assuming you already have a reusable modal components
import axiosInstance from '../../config/axios';
import { UpdateMealForm } from './UpdateMealForm';
import { CreateMealForm } from './CreateMealForm';
import PropTypes from 'prop-types';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); // Used to track which meal is selected for editing
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosInstance.get('/meals/');
        setMeals(response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch meals',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchMeals();
  }, [toast]);

  const handleMealSubmit = async (mealData) => {
    try {
      const response = selectedMeal
        ? await axiosInstance.put(`/meals/update/${selectedMeal._id}`, mealData)
        : await axiosInstance.post('/meals/', mealData);

      setMeals((prev) =>
        selectedMeal
          ? prev.map((meal) =>
              meal._id === selectedMeal._id ? response.data : meal
            )
          : [...prev, response.data]
      );
      onClose();
      toast({
        title: `Meal ${selectedMeal ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error?.message);
      toast({
        title: 'Error',
        description: 'Failed to save meal',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateMeal = () => {
    setSelectedMeal(null); // Clear selected meal for new meal creation
    onOpen();
  };

  const handleEditMeal = (meal) => {
    setSelectedMeal(meal); // Set the meal to be edited
    onOpen();
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Meals</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='5'
      >
        <Flex direction='column' w='full' h='full'>
          <Button
            onClick={handleCreateMeal}
            colorScheme='teal'
            w='10rem'
            mb='5'
          >
            Create New Meal
          </Button>
          <Flex wrap='wrap' gap='5' w='full'>
            {meals?.map((meal) => (
              <MealsCard
                key={meal._id}
                id={meal._id}
                url={meal.mealImage.url}
                mealName={meal.mealName}
                calories={meal.calories}
                macros={meal.macros}
                handleEditMeal={handleEditMeal}
                meal={meal}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>

      {/* Modal for creating/updating meals */}
      <MainModal
        title={selectedMeal ? 'Edit Meal' : 'Create Meal'}
        isOpen={isOpen}
        onClose={onClose}
        footerContent={null}
      >
        {selectedMeal ? (
          <UpdateMealForm mealId={selectedMeal._id} onClose={onClose} />
        ) : (
          <CreateMealForm onClose={onClose} />
        )}
      </MainModal>
    </Flex>
  );
};

const MealsCard = ({
  id,
  url,
  mealName,
  calories,
  macros,
  handleEditMeal,
  meal,
}) => (
  <Box
    key={id}
    bg='white'
    p='4'
    rounded='md'
    shadow='md'
    overflow='hidden'
    textAlign='center'
    w='15rem'
    h='20rem'
  >
    <Image
      src={url}
      alt={mealName}
      boxSize='150px'
      objectFit='cover'
      mx='auto'
    />
    <Text fontSize='xl' mt='4'>
      {mealName}
    </Text>
    <Text>Calories: {calories}</Text>
    <Text>Macros: {macros}</Text>
    <Button mt='4' colorScheme='teal' onClick={() => handleEditMeal(meal)}>
      Edit
    </Button>
  </Box>
);
MealsCard.propTypes = {
  id: PropTypes.any,
  url: PropTypes.any,
  mealName: PropTypes.any,
  calories: PropTypes.any,
  macros: PropTypes.any,
  handleEditMeal: PropTypes.any,
  meal: PropTypes.any,
};

export default Meals;

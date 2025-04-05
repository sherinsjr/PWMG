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
import MainModal from '../../components/modal';
import axiosInstance from '../../config/axios';
import { UpdateMealForm } from './UpdateMealForm';
import { CreateMealForm } from './CreateMealForm';
import DeleteMeal from './deleteMeal';
import PropTypes from 'prop-types';
import { useUserData } from '../../contexts/userContext';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); // Used to track which meal is selected for editing or deleting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: OnDeleteClose,
  } = useDisclosure();
  const toast = useToast();

  const { user } = useUserData();
  // const userId = user?._id;
  const userRole = user?.role;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosInstance.get('/meals/');
        setMeals(response.data);
      } catch (error) {
        console.log(error.message);

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

  const handleCreateMeal = () => {
    setSelectedMeal(null); // Clear selected meal for new meal creation
    onOpen();
  };

  const handleEditMeal = (meal) => {
    setSelectedMeal(meal); // Set the meal to be edited or deleted
    onOpen();
  };

  const handleDeleteMeal = (meal) => {
    setSelectedMeal(meal); // Set the meal to be deleted
    onDeleteOpen();
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
          {userRole === 'admin' ? (
            <Button
              onClick={handleCreateMeal}
              colorScheme='teal'
              w='10rem'
              mb='5'
            >
              Create New Meal
            </Button>
          ) : (
            <></>
          )}
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
                handleDeleteMeal={handleDeleteMeal}
                meal={meal}
                role={userRole}
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

      {/* Modal for deleting meals */}
      <MainModal
        isOpen={isDeleteOpen}
        onClose={OnDeleteClose}
        title='Delete Confirmation'
      >
        {selectedMeal ? (
          <DeleteMeal id={selectedMeal._id} onClose={OnDeleteClose} />
        ) : (
          <Text>No meal selected for deletion</Text>
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
  handleDeleteMeal,
  meal,
  role,
}) => (
  <Box
    as={Flex}
    direction='column'
    key={id}
    bg='transparent'
    p='4'
    rounded='md'
    shadow='md'
    overflow='hidden'
    textAlign='center'
    w='15rem'
    h='22rem'
    gap='1'
  >
    <Flex justify='center' alignItems='center'>
      <Image src={url} alt={mealName} objectFit='contain' w='8rem' h='8rem' />
    </Flex>
    <Text fontSize='xl' mt='4' fontWeight='semibold'>
      {mealName}
    </Text>
    <Flex w='full' justifyContent='space-between' color='rgba(0, 0, 0, 0.80)'>
      <Text fontSize='1rem' fontWeight='bold'>
        Calories:
      </Text>
      <Text fontSize='1rem' fontWeight='normal'>
        {calories}
      </Text>
    </Flex>
    <Flex w='full' justifyContent='space-between' color='rgba(0, 0, 0, 0.80)'>
      <Text fontSize='1rem' fontWeight='bold'>
        Macros:
      </Text>
      <Text fontSize='1rem' fontWeight='normal'>
        {macros}
      </Text>
    </Flex>
    {role === 'admin' ? (
      <Flex gap='2' w='full' justify='center' alignItems='center'>
        <Button
          mt='4'
          w='5rem'
          colorScheme='yellow'
          onClick={() => handleEditMeal(meal)}
        >
          Edit
        </Button>
        <Button
          w='5rem'
          mt='4'
          colorScheme='red'
          onClick={() => handleDeleteMeal(meal)}
        >
          Delete
        </Button>
      </Flex>
    ) : (
      <></>
    )}
  </Box>
);
MealsCard.propTypes = {
  id: PropTypes.any,
  url: PropTypes.any,
  mealName: PropTypes.any,
  calories: PropTypes.any,
  macros: PropTypes.any,
  handleEditMeal: PropTypes.any,
  handleDeleteMeal: PropTypes.any,
  meal: PropTypes.any,
};

export default Meals;

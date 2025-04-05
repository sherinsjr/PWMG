import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import MainModal from '../../components/modal';
import { useUserData } from '../../contexts/userContext';
import WorkoutDetailsView from './workoutView';

const WorkoutDetailsPage = () => {
  const toast = useToast();
  const { search } = useLocation();
  const workoutCategory = new URLSearchParams(search).get('workout');
  const [workoutDetails, setWorkoutDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user } = useUserData();
  console.log(user);
  const role = user?.role;

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (workoutCategory) {
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        setLoading(true);
        try {
          const category = capitalizeFirstLetter(workoutCategory);
          const response = await axiosInstance.get(
            `/workout/category/${category}`
          );
          const fetchedWorkouts = response?.data;
          if (fetchedWorkouts) {
            setWorkoutDetails(fetchedWorkouts);
          }
        } catch (error) {
          console.log(error?.message);
          toast({
            title: 'Error',
            description: 'Failed to fetch workouts',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();
  }, [workoutCategory, toast]);

  const handleDelete = async (workoutId, onClose) => {
    setBtnLoading(true);
    try {
      await axiosInstance.delete(`/workout/delete/${workoutId}`);
      setWorkoutDetails((prev) =>
        prev.filter((item) => item._id !== workoutId)
      );
      setBtnLoading(false);
      toast({
        title: 'Deleted',
        description: 'Workout deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to delete workout',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Workout Details</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        direction='column'
      >
        {role === 'admin' && (
          <Flex mt='10' w='full' p='5'>
            <Button as={Link} to='/user/workoutlibrary/workout/create'>
              Create Workout
            </Button>
          </Flex>
        )}
        {loading ? (
          <Spinner w='5rem' alignSelf='center' h='5rem' thickness='0.4rem' />
        ) : (
          <>
            {workoutDetails.length !== 0 ? (
              <Flex flexWrap='wrap' w='full' gap='2' alignItems='center' p='5'>
                {workoutDetails.map((item, index) => (
                  <WorkoutDetailsCard
                    key={index}
                    workoutId={item._id}
                    workoutName={item?.workoutName}
                    src={item?.workoutImage.url}
                    onDelete={handleDelete}
                    btnLoading={btnLoading}
                  />
                ))}
              </Flex>
            ) : (
              <>
                <Text fontSize='1.4rem' textAlign='center'>
                  No Data Found
                </Text>
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

const WorkoutDetailsCard = ({
  workoutId,
  workoutName,
  src,
  onDelete,
  btnLoading,
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateClick = () => {
    navigate(`/user/workoutlibrary/workout/update/${workoutId}`, {
      state: {
        workoutName,
        src,
      },
    });
  };

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Flex
      w='22rem'
      h='7rem'
      bg='#74C3B1'
      gap='5'
      alignItems='center'
      justify='space-around'
      boxShadow='xl'
      p='4'
    >
      <Flex>
        <Text>{workoutName}</Text>
      </Flex>
      <Flex h='6rem' w='4rem'>
        <Image src={src} h='full' w='full' objectFit='contain' />
      </Flex>
      <Flex direction='column' gap='2'>
        <Button
          variant='unstyled'
          w='7rem'
          color='brand.white'
          bg='#0d343c'
          h='2rem'
          borderRadius='1rem'
          onClick={onModalOpen}
        >
          {' '}
          View Details
        </Button>
      </Flex>
      <Flex gap='4' direction='column'>
        <IconButton
          aria-label='Edit'
          icon={<AiOutlineEdit />}
          colorScheme='yellow'
          size='sm'
          onClick={handleUpdateClick}
        />
        <IconButton
          aria-label='Delete'
          icon={<MdDelete />}
          colorScheme='red'
          size='sm'
          onClick={onOpen}
        />
      </Flex>
      <MainModal
        title='View Workout'
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <WorkoutDetailsView workoutId={workoutId} />
      </MainModal>

      <MainModal
        title='Delete Workout'
        isOpen={isOpen}
        onClose={onClose}
        footerContent={
          <>
            <Button
              colorScheme='red'
              mr={3}
              onClick={() => onDelete(workoutId, onClose)}
              isLoading={btnLoading}
            >
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </>
        }
      >
        <Text>Are you sure you want to delete this workout?</Text>
      </MainModal>
    </Flex>
  );
};

export default WorkoutDetailsPage;

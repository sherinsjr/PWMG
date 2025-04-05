import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useState } from 'react';

import axiosInstance from '../../config/axios';

const DeleteMeal = ({ onClose, id }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/meals/delete/${id}`);
      if (response?.status === 200 && response?.statusText === 'OK') {
        setLoading(false);
        toast({
          description: response?.data?.message || 'User deleted successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        onClose();
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Failed',
        description:
          error?.data?.message ||
          'Something went wrong while deleting the user',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justifySelf='center'
      alignSelf='center'
      justifyContent='center'
      gap='2'
    >
      <Flex>
        <Text fontSize={{ base: '1.2rem' }}>Are you sure about deleting?</Text>
      </Flex>
      <Flex gap='4' alignSelf='flex-end' mt='4'>
        <Button
          type='button'
          bg={'#EEB82D'}
          color='black'
          mt='4'
          px={{ base: '4', md: '6' }}
          onClick={onClose}
          _hover={{ bg: 'yellow.300' }}
          borderRadius='0.7rem'
          size='sm'
          spinnerPlacement='start'
        >
          Cancel
        </Button>
        <Button
          px={{ base: '4', md: '6' }}
          bg={'brand.dark'}
          color='white'
          type='submit'
          mt='4'
          _hover={{ bg: 'green.400', color: 'brand.white' }}
          borderRadius='0.7rem'
          size='sm'
          onClick={handleDelete}
          isLoading={loading}
          loadingText='Deleting'
          spinnerPlacement='start'
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );
};

DeleteMeal.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
};

export default DeleteMeal;

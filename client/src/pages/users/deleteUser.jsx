import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../apis/userApis';

const DeleteUser = ({ onClose, id }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const queryClient = useQueryClient();

  const mutatedData = useMutation({
    mutationFn: (id) => {
      return deleteUser(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data, status, statusText } = await mutatedData.mutateAsync(id);

      if (status === 200 && statusText === 'OK') {
        toast({
          title: 'success',
          description: data?.data?.message || 'User Deleted successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });

        setLoading(false);

        onClose();
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to delete User',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='2'
    >
      <Flex>
        <Text fontSize={{ base: '1.2rem' }}>
          Are you sure you want to delete?
        </Text>
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
        >
          Cancel
        </Button>
        <Button
          px={{ base: '4', md: '6' }}
          bg='brand.mainTeal'
          color='brand.white'
          type='button'
          mt='4'
          _hover={{ bg: 'green.400' }}
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

DeleteUser.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default DeleteUser;

import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from '../../apis/userApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormInput from '../../components/formElements/formInput';

const UpdateUser = ({ onClose, userData }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutatedData = useMutation({
    mutationFn: (id, updatedUser) => {
      return updateUser(id, updatedUser);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        firstName: firstName || data?.firstName,
        lastName: lastName || data?.lastName,
        phoneNumber: phoneNumber || data?.phoneNumber,
      };
      const userId = userData?._id;

      const { data, status, statusText } = await mutatedData.mutateAsync({
        id: userId,
        updatedData,
      });

      if (status === 200 && statusText === 'OK') {
        toast({
          title: 'success',
          description: data?.data?.message || 'User updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error);

      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to update user',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      <Text color='#3d3d3d' fontSize='1.5rem' fontWeight='semibold'>
        Update User
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='First Name'
          id='firstName'
          type='text'
          isRequired={true}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          labelColor='black'
        />
        <FormInput
          label='Last Name'
          id='lastName'
          type='text'
          isRequired={true}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          labelColor='black'
        />
        <FormInput
          label='Phone Number'
          id='phoneNumber'
          type='text'
          isRequired={true}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          labelColor='black'
        />
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
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
            w='48%'
            px={{ base: '4', md: '6' }}
            bg='brand.btnBg'
            color='brand.white'
            type='submit'
            mt='4'
            _hover={{ bg: 'green.400' }}
            borderRadius='0.7rem'
            size='sm'
            isLoading={btnLoading}
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdateUser.propTypes = {
  userData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateUser;

import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FormInput from '../../components/formElements/formInput';
import axiosInstance from '../../config/axios';
import { getItemFromLocalStorage } from '../../utils/localStorage';

const UpdatePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setloading] = useState(false);

  const toast = useToast();

  const user = getItemFromLocalStorage('user');

  const validateInputs = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return false;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Weak Password',
        description: 'New password must be at least 6 characters long.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirm password must match.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      setloading(true);

      const passwordData = {
        oldPassword: currentPassword,
        newPassword: newPassword,
        email: user?.email,
      };

      const response = await axiosInstance.post(`user/reset`, passwordData);

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Password updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setloading(false);
        onClose();
      }
    } catch (error) {
      setloading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to update password',
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
      <Text color='brand.mainTeal' fontSize='1.5rem' fontWeight='semibold'>
        Update Password
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Current Password'
          id='currentPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <FormInput
          label='New Password'
          id='newPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FormInput
          label='Confirm Password'
          id='confirmPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            bg='brand.mainTeal'
            color='brand.white'
            type='submit'
            mt='4'
            _hover={{ bg: 'green.400' }}
            borderRadius='0.7rem'
            size='sm'
            isLoading={loading}
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

UpdatePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default UpdatePassword;

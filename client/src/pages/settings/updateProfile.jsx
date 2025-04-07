import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FormInput from '../../components/formElements/formInput';
import axiosInstance from '../../config/axios';

const UpdateProfile = ({ onClose, data }) => {
  const [firstName, setFirstName] = useState(data?.firstName || '');
  const [lastName, setLastName] = useState(data?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || '');
  const [loading, setloading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const userData = {
        firstName,
        lastName,
        phoneNumber,
      };

      const response = await axiosInstance.put(`user/update/me`, userData);

      if (response.status === 200) {
        toast({
          title: 'success',
          description: response?.data?.message || 'Profile successfully',
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
          error?.response?.data?.message || 'Failed to update profile',
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
        Update Profile
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Email'
          id='email'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          isDisabled
          value={data?.email}
        />
        <FormInput
          label='First Name'
          id='firstName'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          label='Last Name'
          id='lastName'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          label='Phone Number'
          id='phoneNumber'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <FormInput
          label='Designation'
          id='designation'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.designation}
          isDisabled
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

UpdateProfile.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateProfile;

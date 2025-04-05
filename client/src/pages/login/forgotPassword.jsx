import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { LoginInput } from '../../components/formElements';
import axiosInstance from '../../config/axios';

const ForgotPassword = ({ onClose }) => {
  const toast = useToast();
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const showToast = useCallback(
    (title, description, status, variant = 'left-accent') => {
      toast({
        title,
        description,
        status,
        variant,
        position: 'top',
        isClosable: true,
        duration: 3000,
      });
    },
    [toast]
  );

  const handleSuccess = useCallback(
    (data) => {
      onClose();
      showToast(
        'Reset',
        data?.message || 'Password reset completed and email sent.',
        'success'
      );
    },
    [onClose, showToast]
  );

  const handleError = useCallback(
    (error) => {
      setBtnIsLoading(false);
      showToast(
        'Failed',
        error?.response?.data?.message || 'An error occurred.',
        'error',
        'top-accent'
      );
    },
    [showToast]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent Login form submission
      setBtnIsLoading(true);

      const { email } = event.target.elements;
      const emailValue = email.value.trim();

      if (!emailValue) {
        setBtnIsLoading(false);
        showToast('Email Is Required', null, 'error');
        return;
      }

      try {
        const { data } = await axiosInstance.post('/user/reset', {
          email: emailValue,
        });
        handleSuccess(data);
      } catch (error) {
        handleError(error);
      } finally {
        setBtnIsLoading(false);
      }
    },
    [handleSuccess, handleError, showToast]
  );

  return (
    <Flex as={chakra.form} flexDir='column' gap='5' onSubmit={handleSubmit}>
      <Text fontSize={{ base: '1rem', lg: '1.1rem' }} textAlign='justify'>
        Please enter your registered email ID to reset password
      </Text>
      <LoginInput type='email' id='email' placeholder='Email' isRequired />
      <Flex
        gap='2'
        width='100%'
        justifyContent='flex-end'
        alignItems='flex-end'
      >
        <Button
          bg='#E0C171'
          color='brand.dark'
          alignSelf='flex-end'
          fontSize='14px'
          type='button'
          size='sm'
          onClick={onClose}
          borderRadius='0.7rem'
          px={{ base: '4', md: '6' }}
        >
          Cancel
        </Button>
        <Button
          bg='brand.btnBg'
          alignSelf='flex-end'
          fontSize='14px'
          type='submit'
          size='sm'
          isLoading={btnIsLoading}
          color='brand.white'
          borderRadius='0.7rem'
          px={{ base: '4', md: '6' }}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ForgotPassword;

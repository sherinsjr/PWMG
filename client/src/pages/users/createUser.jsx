import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/formElements/formInput';
import SelectInput from '../../components/formElements/selectInput';
import axiosInstance from '../../config/axios';

const CreateUser = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        role: userRole,
      };

      const response = await axiosInstance.post(`user/create`, userData);

      if (response.status === 201) {
        toast({
          title: 'success',
          description: response?.data?.message || 'User Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        navigate('/user/users');
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to create user',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Create User</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='10'
      >
        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='First Name'
              id='firstName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label='Last Name'
              id='lastName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setlastName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Email'
              id='email'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label='Phone Number'
              id='phoneNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <SelectInput
              id='role'
              name='role'
              validator={{
                required: 'Choose a role',
              }}
              w='45%'
              options={[
                {
                  label: 'Trainer',
                  value: 'trainer',
                },
                {
                  label: 'Nutritian',
                  value: 'nutritian',
                },
              ]}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
              onChange={(e) => setUserRole(e.target.value)}
            >
              Role
            </SelectInput>
          </Flex>
          <Flex w='95%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={() => {
                navigate('/user/institutions');
              }}
            >
              Back
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
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateUser;

import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/formElements/formInput';
import SelectInput from '../../components/formElements/selectInput';
import axiosInstance from '../../config/axios';

const CreateClient = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [trainer, setTrainer] = useState('');
  const [trainers, setTrainers] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getTrainerList();
  }, []);

  const getTrainerList = async () => {
    try {
      const { data, status, statusText } = await axiosInstance.get(
        `/user/role?role=trainer`
      );

      if (status === 200 && statusText === 'OK') {
        setTrainers(data?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        age,
        weight,
        height,
        personalTrainer: trainer.length > 0 ? trainer : null,
      };

      const response = await axiosInstance.post(`client/create`, userData);

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
        navigate('/user/clients');
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
      <Heading>Create Client</Heading>
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
              labelColor='black'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label='Last Name'
              id='lastName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
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
              labelColor='black'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label='Phone Number'
              id='phoneNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <SelectInput
              id='gender'
              name='gender'
              validator={{
                required: 'Choose a gender',
              }}
              w='90%'
              options={[
                {
                  label: 'Male',
                  value: 'Male',
                },
                {
                  label: 'Female',
                  value: 'Female',
                },
                {
                  label: 'Others',
                  value: 'Others',
                },
              ]}
              optionProps={{
                background: '#3d3d3d',
                color: '#ffffff',
              }}
              onChange={(e) => setGender(e.target.value)}
            >
              Gender
            </SelectInput>
            <SelectInput
              id='trainer'
              name='trainer'
              validator={{
                required: 'Choose a Trainer',
              }}
              w='90%'
              options={trainers.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,
              }))}
              optionProps={{
                background: '#3d3d3d',
                color: '#ffffff',
              }}
              onChange={(e) => setTrainer(e.target.value)}
            >
              Trainer
            </SelectInput>
          </Flex>
          <Flex w='full'>
            <FormInput
              label='height'
              id='height'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
              onChange={(e) => setHeight(e.target.value)}
            />
            <FormInput
              label='Age'
              id='phoneNageumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
              onChange={(e) => setAge(e.target.value)}
            />
            <FormInput
              label='Weight'
              id='weight'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
              onChange={(e) => setWeight(e.target.value)}
            />
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

export default CreateClient;

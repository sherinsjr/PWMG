import { chakra, Flex, Image, Select, Text, useToast } from '@chakra-ui/react';
import { Logo } from '../../assets';
import { LoginInput, PasswordInput } from '../../components/formElements';
import { SimpleButton } from '../../components/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../config/axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    personalInfo: {
      height: '',
      weight: '',
      bloodGroup: '',
      gender: '',
    },
  });
  const navigate = useNavigate();

  const toast = useToast();

  // State to show additional fields
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  // Handle input change for both sections
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data, handling nested personalInfo fields separately
    if (name in formData.personalInfo) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle submission of the first section
  const handleFirstSectionSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      toast({
        title: 'Please fill in all required fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    // Show the additional fields section
    setShowAdditionalFields(true);
  };

  // Handle final submission of all data
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/register', {
        ...formData,
        personalInfo: {
          height: formData.personalInfo.height,
          weight: formData.personalInfo.weight,
          bloodGroup: formData.personalInfo.bloodGroup,
          gender: formData.personalInfo.gender,
        },
      });
      if (response.status === 201) {
        toast({
          title: 'Signup Successful.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        // Reset form data and hide additional fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          personalInfo: {
            height: '',
            weight: '',
            bloodGroup: '',
            gender: '',
          },
        });
        setShowAdditionalFields(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration', error.message);
    }
  };

  return (
    <Flex
      w='100dvw'
      h='100dvh'
      overflowX='hidden'
      overflowY='hidden'
      alignItems='center'
      justify='center'
    >
      <Flex
        w='30rem'
        h='auto'
        bg='#D9D9D9'
        border='0.25rem solid'
        borderColor='#0D343C'
        rounded='1rem'
        p='5'
      >
        <Flex
          as={chakra.form}
          w='full'
          h='full'
          alignItems='center'
          justify='center'
          direction='column'
          gap='4'
          onSubmit={
            showAdditionalFields ? handleFinalSubmit : handleFirstSectionSubmit
          }
        >
          <Image src={Logo} alt='FlexFit Logo' boxSize='10rem' />

          {/* Section 1: Basic Information Fields */}
          {!showAdditionalFields && (
            <Flex w='full' direction='column' gap='4'>
              <Flex gap='2' direction={{ base: 'column', md: 'row' }}>
                <LoginInput
                  placeholder='First Name'
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <LoginInput
                  placeholder='Last Name'
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Flex>
              <LoginInput
                placeholder='Email ID'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <LoginInput
                placeholder='Phone Number'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <PasswordInput
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <SimpleButton
                bg='brand.btnBg'
                w='8rem'
                color='white'
                type='submit'
              >
                Next
              </SimpleButton>
            </Flex>
          )}

          {/* Section 2: Additional Fields */}
          {showAdditionalFields && (
            <Flex
              w='full'
              direction='column'
              gap='4'
              justify='center'
              alignItems='center'
            >
              <LoginInput
                placeholder='Height'
                type='text'
                name='height'
                value={formData.personalInfo.height}
                onChange={handleChange}
              />
              <LoginInput
                placeholder='Weight'
                type='text'
                name='weight'
                value={formData.personalInfo.weight}
                onChange={handleChange}
              />
              <LoginInput
                placeholder='Blood Group'
                type='text'
                name='bloodGroup'
                value={formData.personalInfo.bloodGroup}
                onChange={handleChange}
              />
              <Flex direction='column' w='full'>
                <Select
                  id='gender'
                  name='gender'
                  value={formData.personalInfo.gender}
                  onChange={handleChange}
                  bg='#7C898D'
                  color='#ffffffCC'
                >
                  <option
                    style={{
                      backgroundColor: '#7C898D',
                    }}
                    value=''
                  >
                    Select Gender
                  </option>
                  <option
                    style={{
                      backgroundColor: '#7C898D',
                    }}
                    value='Male'
                  >
                    Male
                  </option>
                  <option
                    style={{
                      backgroundColor: '#7C898D',
                    }}
                    value='Female'
                  >
                    Female
                  </option>
                  <option
                    style={{
                      backgroundColor: '#7C898D',
                    }}
                    value='Other'
                  >
                    Other
                  </option>
                </Select>
              </Flex>
              <SimpleButton
                bg='brand.btnBg'
                w='8rem'
                color='white'
                type='submit'
              >
                Submit
              </SimpleButton>
            </Flex>
          )}
          <Flex gap='1' color='#0D343C'>
            <Text>Already have an account?</Text>
            <Link to='/login'>LOGIN</Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;

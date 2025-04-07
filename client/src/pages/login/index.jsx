import { useState } from 'react';
import {
  Button,
  chakra,
  Flex,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Logo } from '../../assets';
import { LoginInput, PasswordInput } from '../../components/formElements';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import axiosInstance, { axiosErrorHandler } from '../../config/axios';
import MainModal from '../../components/modal';
import ForgotPassword from './forgotPassword';
import { SimpleButton } from '../../components/buttons';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const auth = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = e.target.elements;
      const trimmedEmail = email.value.trim();
      const trimmedPassword = password.value.trim();

      const response = await axiosInstance.post('/user/login', {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      const { data } = response;
      const status = response?.status;
      const statusText = response?.statusText;
      const user = data?.user;
      const token = data?.token;

      if (status === 200 && statusText === 'OK') {
        auth.signIn(token, user, () => {
          navigate(`/user/dashboard`);
        });
        e.target.reset();
        toast({
          title: data?.message || 'Login Successful.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      axiosErrorHandler(error);
      toast({
        title: 'Login Failed.',
        description: error.response?.data?.message || 'Invalid credentials.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
        w='25rem'
        h='30rem'
        bg='#D9D9D9'
        // border='0.25rem solid'
        // borderColor='#0D343C'
        rounded='1rem'
      >
        <Flex
          as={chakra.form}
          w='full'
          h='full'
          alignItems='center'
          justify='center'
          direction='column'
          p='5'
          gap='4'
          onSubmit={handleSubmit}
        >
          <Image src={Logo} alt='FlexFit Logo' boxSize='10rem' />
          <LoginInput type='email' placeholder='Email Id' name='email' />
          <PasswordInput placeholder='Password' name='password' />
          <SimpleButton
            bg='#5FF3F0'
            w='full'
            color='black'
            type='submit'
            isLoading={isLoading}
            loadingText='Loggin In'
            textAlign='center'
          >
            Login
          </SimpleButton>
          {/* <Flex gap='1' color='#0D343C'>
            <Text>Don&apos;t have an account?</Text>
            <Link to='/signup'>SIGN UP</Link>
          </Flex> */}
          <Button
            variant='unstyled'
            onClick={onOpen}
            color='#0D343C'
            cursor='pointer'
            w='10rem'
            h='2rem'
          >
            Forgot Password?
          </Button>
          <MainModal
            isOpen={isOpen}
            onClose={onClose}
            title='Forgot Password ?'
          >
            <ForgotPassword onClose={onClose} />
          </MainModal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;

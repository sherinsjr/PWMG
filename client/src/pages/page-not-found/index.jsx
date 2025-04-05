import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
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
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        bg='gray.100'
        color='gray.800'
        textAlign='center'
        w='full'
        h='full'
      >
        <Heading fontSize='10rem' color='red.400' mb='0'>
          404
        </Heading>
        <Heading fontSize='2.5rem' mb='4'>
          Page Not Found
        </Heading>
        <Text fontSize='1.25rem' color='gray.600' maxW='600px' mb='6'>
          We're sorry, the page you are looking for is under development
        </Text>
        <Button
          onClick={goToHome}
          colorScheme='blue'
          size='lg'
          px='6'
          py='3'
          _hover={{ bg: 'blue.600' }}
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
};

export default PageNotFound;

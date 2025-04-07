import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Flex w='full' h='100vh' overflow='auto'>
      <Flex
        h='full'
        w='full'
        // bgGradient='linear-gradient(180deg, #FFFFFF 20.09%, rgba(124, 137, 141, 0.8) 77.5%)'
        bg='#A3A7F3'
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;

import { Flex } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import DesktopSidebar from '../sidebar/desktopSidebar';
import Header from '../../components/header';

const DesktopLayout = () => {
  return (
    <Flex
      gap='4'
      overflow='auto'
      bgGradient='linear-gradient(180deg, #FFFFFF 20.09%, rgba(124, 137, 141, 0.8) 77.5%)'
      w='100vw'
      h='100vh'
    >
      <Flex
        h='full'
        w='full'
        overflowX='hidden'
        overflowY='hidden'
        bgPos='center'
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          p='4'
          display={{ base: 'none', lg: 'flex' }}
        >
          <DesktopSidebar />
        </Flex>
        <Flex direction='column'>
          {/* <Flex>
         <Header />
         </Flex> */}
          <Flex
            justifyContent='center'
            alignItems='center'
            direction='column'
            w='full'
            h='100%'
            p='4'
          >
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DesktopLayout;

import {
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { FiLogOut } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';

import { Logo } from '../../assets/index';
import { SimpleButton } from '../../components/buttons';
import MainModal from '../../components/modal';
import { useAuth } from '../../contexts/authContext';
import { sidebarRoutes } from '../../routes';
import { getItemFromLocalStorage } from '../../utils/localStorage';

function DesktopSidebar() {
  let location = useLocation();
  const auth = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const user = getItemFromLocalStorage('user');

  console.log(user);

  const userName = `${user?.firstName} ${user?.lastName}`;

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? 'active' : '';
  };
  const handleLogout = () => {
    auth.signOut(() => {});
    onClose();
  };
  const footerContent = (
    <Flex gap='2'>
      <Button
        onClick={onClose}
        alignItems='center'
        justifyContent='center'
        px={{ base: '4', md: '6' }}
        bg='#E0C171'
        type='submit'
        mt='4'
        color='brand.dark'
        borderRadius='0.7rem'
        size='sm'
      >
        Cancel
      </Button>
      <Button
        onClick={handleLogout}
        alignItems='center'
        justifyContent='center'
        px={{ base: '4', md: '6' }}
        bg='brand.btnBg'
        type='submit'
        mt='4'
        color='brand.light'
        loadingText='Submitting'
        spinnerPlacement='start'
        borderRadius='0.7rem'
        size='sm'
      >
        Confirm Logout
      </Button>
    </Flex>
  );

  return (
    <Flex
      w='250px'
      h='96%'
      borderRadius='20px'
      // bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
      bg='#D9D9D9'
      color='brand.dark'
      justifyContent='center'
      display={{ base: 'none', lg: 'flex' }}
      transition='200ms ease'
    >
      <Flex direction='column' gap='10px' textAlign='center'>
        <Image
          w='10rem'
          alignSelf='center'
          mt='15px'
          h='10rem'
          borderRadius='50%'
          src={Logo}
        />
        <Text
          fontSize='18px'
          textTransform='uppercase'
          fontWeight='bold'
          color='black'
        >
          Personal Trainer
        </Text>
        <Flex direction='column' mt='20px' alignItems={'flex-start'}>
          {sidebarRoutes.map((route, i) => (
            <Flex mb='20px' key={i}>
              <NavLink to={route.path}>
                <SimpleButton
                  color='white'
                  bg='#3d3d3d'
                  display='inline-flex'
                  fontWeight='medium'
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  alignItems='flex-start'
                  gap='1'
                  p='2'
                  w='200px'
                >
                  <Icon w={8} h={8} p='1'>
                    {route.icon}
                  </Icon>
                  <Text
                    fontSize={14}
                    fontWeight='medium'
                    display={{ base: 'none', md: 'block' }}
                  >
                    {route.routeName}
                  </Text>
                </SimpleButton>
              </NavLink>
            </Flex>
          ))}
          <SimpleButton
            as={Flex}
            variant='unstyled'
            color='black'
            position='fixed'
            bottom='12'
            onClick={() => {
              onOpen();
            }}
            w='200px'
            justifyContent='center'
            alignContent={'center'}
          >
            <Flex
              justifyContent='center'
              alignContent={'center'}
              gap='2'
              _hover={{ bg: 'none' }}
            >
              <Flex mt='1'>
                <FiLogOut w={8} h={8} p='1' color='brand.dark' />
              </Flex>
              <Text fontSize='16px' color='brand.dark'>
                Logout
              </Text>
            </Flex>
          </SimpleButton>
          {/* confirmation modal */}
          <MainModal
            title='Logout Confirmation'
            isOpen={isOpen}
            onClose={onClose}
            footerContent={footerContent}
            m='40px'
          >
            <Text color='black'>Are you sure you want to logout?</Text>
          </MainModal>
        </Flex>
      </Flex>
    </Flex>
    // </Flex>
  );
}

export default DesktopSidebar;

import {
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import MainModal from '../../components/modal';
import TableComponent from '../../components/table/mainTable';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../config/axios';
import { getItemFromLocalStorage } from '../../utils/localStorage';
import UpdateProfile from './updateProfile';
import UpdatePassword from './updatePassword';
const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const [reports, setReports] = useState([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isModalPasswordOpen,
    onOpen: onModalPasswordOpen,
    onClose: onModalPasswordClose,
  } = useDisclosure();

  const user = getItemFromLocalStorage('user');
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Settings</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='10'
      >
        <Flex
          w='100%'
          h='100%'
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text color='brand.btnBg' fontSize='1.2rem' fontWeight='semibold'>
                Name
              </Text>
              <Text
                color='brand.white'
                fontSize='1.1rem'
              >{`${user?.firstName} ${user?.lastName}`}</Text>
            </Flex>
          </Flex>
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text color='brand.btnBg' fontSize='1.2rem' fontWeight='semibold'>
                Email
              </Text>
              <Text color='brand.white' fontSize='1.1rem'>
                {user?.email}
              </Text>
            </Flex>
            <Button
              w='6rem'
              px={{ base: '4', md: '6' }}
              bg='brand.black'
              color='brand.white'
              type='submit'
              mt='4'
              _hover={{ bg: 'brand.mainTeal' }}
              borderRadius='0.7rem'
              size='sm'
              border='2px solid'
              borderColor='brand.mainTeal'
              onClick={onModalOpen}
            >
              Edit
            </Button>
          </Flex>
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text color='brand.btnBg' fontSize='1.2rem' fontWeight='semibold'>
                Password
              </Text>
              <Text color='brand.white' fontSize='1.1rem'>
                ************
              </Text>
            </Flex>
            <Button
              w='6rem'
              px={{ base: '4', md: '6' }}
              bg='brand.black'
              color='brand.white'
              type='submit'
              mt='4'
              _hover={{ bg: 'brand.mainTeal' }}
              borderRadius='0.7rem'
              size='sm'
              border='2px solid'
              borderColor='brand.mainTeal'
              onClick={onModalPasswordOpen}
            >
              Edit
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateProfile onClose={onModalClose} data={user} />
      </MainModal>
      <MainModal
        isOpen={isModalPasswordOpen}
        onClose={onModalPasswordClose}
        bgColor='brand.dashboardBg'
      >
        <UpdatePassword onClose={onModalPasswordClose} />
      </MainModal>
    </Flex>
  );
};

export default Settings;

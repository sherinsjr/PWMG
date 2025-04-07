import {
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import MainModal from '../../components/modal';
import TableComponent from '../../components/table/mainTable';
import { getMyClients } from '../../apis/clientApis';
import UpdateClient from './updateClient';
import DeleteClient from './deleteClient';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clients, setClients] = useState([]);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await getMyClients();

      if (response.status === 200 && response.statusText === 'OK') {
        setClients(response?.data?.clients);
        console.log(response?.data?.clients);
        setLoading(false);
      }
      return response?.data?.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  // useQuery({
  //   queryKey: ['clients'],
  //   queryFn: async () => {
  //     try {
  //       const response = await getMyClients();
  //       if (response.status === 200 && response.statusText === 'OK') {
  //         setClients(response?.data?.clients);
  //         console.log(response?.data?.clients);
  //         setLoading(false);
  //       }
  //       return response?.data?.data;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   },
  // });

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex>
            <Button
              bg='transparent'
              color='brand.white'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setSelectedUser(cell);
                onModalOpen();
              }}
            >
              <MdEdit />
            </Button>
            <Button
              bg='transparent'
              color='brand.white'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setDeleteId(cell?._id);
                onOpen();
              }}
            >
              <MdDelete />
            </Button>
            <Button
              as={Link}
              to={`/user/clients/update/${cell?._id}`}
              bg='transparent'
              color='brand.white'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
            >
              <FaEye />
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Client List</Heading>
      <Flex w='full' h='full' bg='#D9D9D9' rounded='1rem' p='10'>
        <Flex w='100%' h='100%'>
          {loading ? (
            <Flex w='100%' h='100%' alignItems='center' justify='center'>
              <Spinner
                w='8rem'
                h='8rem'
                alignSelf='center'
                color='brand.mainTeal'
                thickness='0.6rem'
              />
            </Flex>
          ) : (
            <TableComponent
              columns={columns}
              data={clients}
              buttonName='Add Client'
              buttonLink='/user/clients/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteClient onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateClient onClose={onModalClose} userData={selectedUser} />
      </MainModal>
    </Flex>
  );
};

export default ClientList;

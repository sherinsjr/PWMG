import {
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';
import { getMyUsers } from '../../apis/userApis';
import { useUserList } from '../../store/userStore';
import MainModal from '../../components/modal';
import TableComponent from '../../components/table/mainTable';
import { useQuery } from '@tanstack/react-query';
const UserList = () => {
  const { users, setUsers } = useUserList();
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await getMyUsers();
        if (response.status === 200 && response.statusText === 'OK') {
          setUsers(response?.data?.data);
          setLoading(false);
        }
        return response?.data?.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

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
        Header: 'Role',
        accessor: 'role',
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
          </Flex>
        ),
      },
    ],
    []
  );
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>User List</Heading>
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
              data={users}
              buttonName='Add User'
              buttonLink='/user/users/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose} bgColor='#D9D9D9'>
        <DeleteUser onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal isOpen={isModalOpen} onClose={onModalClose} bgColor='#D9D9D9'>
        <UpdateUser onClose={onModalClose} userData={selectedUser} />
      </MainModal>
    </Flex>
  );
};

export default UserList;

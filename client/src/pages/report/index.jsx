import {
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import MainModal from '../../components/modal';
import TableComponent from '../../components/table/mainTable';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../config/axios';
import UpdateReport from './updateReport';
import DeleteReport from './deleteReport';
const Report = () => {
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const [reports, setReports] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      try {
        const { data, status, statusText } =
          await axiosInstance.get(`/report/all`);
        if (status === 200 && statusText === 'OK') {
          setReports(data?.reports);
          console.log(data);

          setLoading(false);
        }
        return data?.data;
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Report',
        accessor: 'reportName',
      },
      {
        Header: 'Link',
        accessor: (cell) => {
          const originalUrl = cell?.report?.url || '';
          const downloadUrl = originalUrl.includes('/upload/')
            ? originalUrl.replace('/upload/', '/upload/fl_attachment/')
            : originalUrl;

          return (
            <Link
              href={downloadUrl}
              isExternal
              color='blue.600'
              fontWeight='medium'
            >
              Download
            </Link>
          );
        },
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
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='10'
      >
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
              data={reports}
              buttonName='Add User'
              buttonLink='/user/report/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteReport onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateReport onClose={onModalClose} userData={selectedUser} />
      </MainModal>
    </Flex>
  );
};

export default Report;

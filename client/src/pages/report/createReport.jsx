import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/formElements/formInput';
import axiosInstance from '../../config/axios';

const CreateReport = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportFile, setReportFile] = useState(null); // 📁 New state for file

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      // FormData for file + text
      const formData = new FormData();
      formData.append('reportName', reportName);
      formData.append('report', reportFile); // "file" matches server-side req.file

      const response = await axiosInstance.post(`report/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: response?.data?.message || 'Report created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        navigate('/user/report');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to create report',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Create Report</Heading>
      <Flex w='full' h='full' bg='#D9D9D9' rounded='1rem' p='10'>
        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
          encType='multipart/form-data' // optional but good practice
        >
          <Flex w='full'>
            <FormInput
              label='Report Name'
              id='reportName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='black'
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Upload Report File'
              id='reportFile'
              type='file'
              isRequired={true}
              w='90%'
              labelColor='black'
              onChange={(e) => setReportFile(e.target.files[0])}
            />
          </Flex>

          <Flex w='90%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={() => navigate('/user/report')}
            >
              Back
            </Button>
            <Button
              w='48%'
              px={{ base: '4', md: '6' }}
              bg='brand.btnBg'
              color='brand.white'
              type='submit'
              mt='4'
              _hover={{ bg: 'green.400' }}
              borderRadius='0.7rem'
              size='sm'
              isLoading={btnLoading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateReport;

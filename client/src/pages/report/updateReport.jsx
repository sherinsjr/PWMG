import {
  Button,
  chakra,
  Checkbox,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormInput from '../../components/formElements/formInput';
import { updateReport } from '../../apis/reportApis';

const UpdateReport = ({ onClose, userData }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [doctorRemarks, setDoctorRemarks] = useState(
    userData?.doctorRemarks || ''
  );
  const [suggestedProducts, setSuggestedProducts] = useState(
    userData?.suggestedProducts || []
  );

  const products = [
    { id: 'hsdhsagdsa1233', name: 'Product 1' },
    { id: 'sdkaskdjaklsjd', name: 'Product 2' },
    { id: 'v;klczxv;c;lv', name: 'Product 3' },
    { id: 'xvc;lczvckjxvv', name: 'Product 4' },
  ];

  const handleProductSelection = (id) => {
    setSuggestedProducts((prev) =>
      prev.includes(id) ? prev.filter((page) => page !== id) : [...prev, id]
    );
  };

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutatedData = useMutation({
    mutationFn: ({ id, updatedData }) => updateReport({ id, updatedData }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['report'] }),
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const updatedData = {
        doctorRemarks,
        suggestedProducts,
      };

      const reportId = userData?._id;

      const response = await mutatedData.mutateAsync({
        id: reportId,
        updatedData,
      });

      toast({
        title: 'Success',
        description: response?.data?.message || 'Report updated successfully',
        status: 'success',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to update report',
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
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      <Text color='brand.mainTeal' fontSize='1.5rem' fontWeight='semibold'>
        Update Report
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Doctor Remarks'
          id='doctorRemarks'
          type='text'
          isRequired={true}
          value={doctorRemarks}
          onChange={(e) => setDoctorRemarks(e.target.value)}
          labelColor='brand.black'
        />
        <Flex w='100%' gap={{ base: '2', lg: '4' }} alignItems='center'>
          <Flex w='100%' wrap='wrap' gap='4'>
            {products.map((product) => (
              <Checkbox
                key={product.id}
                w='40%'
                isChecked={suggestedProducts.includes(product.id)}
                onChange={() => handleProductSelection(product.id)}
              >
                <Flex align='center' gap='2'>
                  {product.name}
                </Flex>
              </Checkbox>
            ))}
          </Flex>
        </Flex>
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
            type='button'
            bg={'#EEB82D'}
            color='black'
            mt='4'
            px={{ base: '4', md: '6' }}
            onClick={onClose}
            _hover={{ bg: 'yellow.300' }}
            borderRadius='0.7rem'
            size='sm'
          >
            Cancel
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
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdateReport.propTypes = {
  userData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default UpdateReport;

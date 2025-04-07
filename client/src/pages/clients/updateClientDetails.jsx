import {
  Button,
  chakra,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormInput from '../../components/formElements/formInput';
import SelectInput from '../../components/formElements/selectInput';
import DateInput from '../../components/formElements/dateInput';
import axiosInstance from '../../config/axios';

const UpdateClientDetails = () => {
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { clientId } = useParams();

  const [client, setClient] = useState({});
  const [planName, setPlanName] = useState('');
  const [planAmount, setPlanAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [paymentDate, setPaymentDate] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [workoutPlanId, setWorkoutPlanId] = useState('');
  const [trainers, setTrainers] = useState([]);

  // Sample trainers and plans (replace with API calls if needed)
  //   const trainers = [
  //     { _id: '1', name: 'John Doe' },
  //     { _id: '2', name: 'Jane Smith' },
  //   ];
  const workoutPlans = [
    { _id: 'wp1', name: 'Beginner' },
    { _id: 'wp2', name: 'Advanced' },
  ];

  useEffect(() => {
    getSingleClient();
    getTrainers();
  }, []);

  const getTrainers = async () => {
    try {
      const { data } = await axiosInstance.get(`/user/role?role=trainer`);

      console.log(data?.data);
      setTrainers(data?.data);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const getSingleClient = async () => {
    try {
      const { data } = await axiosInstance.get(`/client/get/${clientId}`);
      const clientData = data?.client;
      setClient(clientData);

      // Set values if available
      const latestFee = clientData?.feeDetails?.[0];
      if (latestFee) {
        setPlanName(latestFee.planName);
        setPlanAmount(latestFee.planAmount);
        setPaymentStatus(latestFee.paymentStatus);
        setPaymentDate(latestFee.paymentDate?.substring(0, 10));
      }
      setTrainerId(clientData?.personalTrainer || '');
      setTrainerName(clientData?.personalTrainer?.firstName || '');
      setWorkoutPlanId(clientData?.preferredWorkoutPlan || '');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load client details.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFee = async (e) => {
    e.preventDefault();

    if (!paymentDate) {
      toast({
        title: 'Missing Payment Date',
        description: 'Please provide a payment date.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const latestFee = client?.feeDetails?.[0];

      let url = '';
      let payload = {};

      if (latestFee) {
        // Update the existing fee
        url = `/client/fees/${clientId}/update`;
        payload = {
          planName,
          planAmount,
          paymentStatus,
          paymentRecievedDate: paymentDate,
        };
        await axiosInstance.put(url, payload);
      } else {
        // Add a new fee if no previous fee exists
        url = `/client/fees/${clientId}/add`;
        payload = {
          planName,
          planAmount,
          paymentStatus,
          paymentDate: new Date(paymentDate),
        };
        await axiosInstance.post(url, payload);
      }

      toast({
        title: 'Success',
        description: 'Fee updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      getSingleClient();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to update fee',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleAssignTrainer = async () => {
    try {
      await axiosInstance.put(`/client/trainer/${clientId}/assign`, {
        trainerId,
      });
      toast({
        title: 'Trainer Assigned',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error assigning trainer',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveTrainer = async () => {
    try {
      await axiosInstance.put(`/client/trainer/${clientId}/remove`);
      setTrainerId('');
      toast({
        title: 'Trainer removed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error removing trainer',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAssignWorkout = async () => {
    try {
      await axiosInstance.put(`/client/set-workout-plan/${clientId}`, {
        workoutPlanId,
      });
      toast({
        title: 'Workout Plan Set',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error assigning workout plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveWorkout = async () => {
    try {
      await axiosInstance.put(`/client/remove-workout-plan/${clientId}`);
      setWorkoutPlanId('');
      toast({
        title: 'Workout Plan Removed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error removing workout plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify='center' align='center' h='100%'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Update Client</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
        p='10'
      >
        <Flex w='100%' h='100%' flexDirection='column' gap='5'>
          {/* Fee Section */}
          <Text fontWeight='semibold' fontSize='1.2rem'>
            Fee Details
          </Text>
          <Flex
            as={chakra.form}
            onSubmit={handleUpdateFee}
            flexDirection='column'
          >
            <Flex gap='4'>
              <FormInput
                label='Plan Name'
                id='planName'
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <FormInput
                label='Plan Amount'
                id='planAmount'
                value={planAmount}
                onChange={(e) => setPlanAmount(e.target.value)}
              />
              <DateInput
                label='Payment Date'
                id='paymentDate'
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </Flex>
            <Flex gap='4' mt='4' alignItems='center'>
              <SelectInput
                id='paymentStatus'
                name='paymentStatus'
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                options={[
                  { label: 'Unpaid', value: 'Unpaid' },
                  { label: 'Paid', value: 'Paid' },
                ]}
                w='23rem'
                optionProps={{
                  background: '#0996A1',
                  color: '#ffffff',
                }}
              >
                Payment Status
              </SelectInput>
              <Button type='submit' bg='green.500' color='white' mt='8'>
                Update
              </Button>
            </Flex>
          </Flex>

          {/* Trainer Section */}
          <Text fontWeight='semibold' fontSize='1.2rem'>
            Trainer Details
          </Text>
          <Flex gap='4' alignItems='center'>
            <SelectInput
              id='trainerId'
              name='trainerId'
              //   value={trainerId}
              onChange={(e) => setTrainerId(e.target.value)}
              options={trainers.map((t) => ({
                label: `${t.firstName} ${t.lastName}`,
                value: t._id,
              }))}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
              value={trainerName}
            >
              Select Trainer
            </SelectInput>
            <Flex gap='2' mt='8'>
              <Button onClick={handleAssignTrainer} bg='blue.400' color='white'>
                Assign
              </Button>
              <Button onClick={handleRemoveTrainer} bg='red.400' color='white'>
                Remove
              </Button>
            </Flex>
          </Flex>

          {/* Workout Plan Section */}
          <Text fontWeight='semibold' fontSize='1.2rem'>
            Workout Plan Details
          </Text>
          <Flex gap='4'>
            <SelectInput
              id='workoutPlanId'
              name='workoutPlanId'
              value={workoutPlanId}
              defaultValue={workoutPlanId}
              onChange={(e) => setWorkoutPlanId(e.target.value)}
              options={workoutPlans.map((w) => ({
                label: w.name,
                value: w._id,
              }))}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
            >
              Select Workout Plan
            </SelectInput>
            <Flex gap='2' mt='8'>
              <Button onClick={handleAssignWorkout} bg='blue.400' color='white'>
                Assign
              </Button>
              <Button onClick={handleRemoveWorkout} bg='red.400' color='white'>
                Remove
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UpdateClientDetails;

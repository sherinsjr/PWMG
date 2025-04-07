import { Button, chakra, Flex, Heading, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/formElements/formInput';
import { getMyClients } from '../../apis/clientApis';
import axiosInstance from '../../config/axios';
import SelectInput from '../../components/formElements/selectInput';

const CreateWorkoutPlanner = () => {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [durationInWeeks, setDurationInWeeks] = useState(4);
  const [workouts, setWorkouts] = useState([{ day: '', workout: '' }]);
  const [clients, setClients] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);

  useEffect(() => {
    // Fetch clients and workouts for dropdowns
    const fetchData = async () => {
      const clientsRes = await getMyClients();
      const workoutsRes = await axiosInstance.get('/workout');
      console.log(workoutsRes?.data);
      setClients(clientsRes?.data?.clients);
      setAllWorkouts(workoutsRes.data);
    };
    fetchData();
  }, []);

  const handleWorkoutChange = (index, field, value) => {
    const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
  };

  const addWorkoutField = () => {
    setWorkouts([...workouts, { day: '', workout: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      planName,
      description,
      assignedTo,
      durationInWeeks,
      workouts,
    };

    try {
      await axiosInstance.post('workout-plan/create', payload);
      navigate('/user/workout-plans');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Create Workout Plan</Heading>
      <Flex
        w='full'
        h='full'
       bg='#D9D9D9'
        rounded='1rem'
        p='10'
      >
        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          overflow='auto'
          onSubmit={handleSubmit}
        >
          <Flex>
            <FormInput
              label='Plan Name'
              id='planName'
              type='text'
              isRequired={true}
              w='95%'
              labelColor='brand.black'
              onChange={(e) => setPlanName(e.target.value)}
            />
            <SelectInput
              id='client'
              name='client'
              validator={{
                required: 'Choose a Client',
              }}
              w='100%'
              options={clients.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,
              }))}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              Assign to Client
            </SelectInput>
          </Flex>
          <Textarea
            placeholder='Description'
            color='black'
            border='2px solid #3d3d3d'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormInput
            label='Duration in Weeks'
            id='duration'
            type='number'
            isRequired={true}
            w='100%'
            labelColor='brand.black'
            onChange={(val) => setDurationInWeeks(parseInt(val))}
          />

          {workouts.map((w, i) => (
            <Flex key={i} gap='4'>
              <FormInput
                label='Day'
                id={`day-${i}`}
                type='text'
                isRequired={true}
                w='90%'
                value={w.day}
                onChange={(e) => handleWorkoutChange(i, 'day', e.target.value)}
              />
              <SelectInput
                id={`workout-${i}`}
                name='workout'
                validator={{
                  required: 'Choose a Workout',
                }}
                w='90%'
                options={allWorkouts.map((item) => ({
                  label: `${item.workoutName}`,
                  value: item._id,
                }))}
                optionProps={{
                  background: '#0996A1',
                  color: '#ffffff',
                }}
                onChange={(e) =>
                  handleWorkoutChange(i, 'workout', e.target.value)
                } // ✅ Fixed
              >
                Select Workout
              </SelectInput>
            </Flex>
          ))}
          <Button h='3rem' w='30%' onClick={addWorkoutField} colorScheme='blue'>
            Add Workout Day
          </Button>

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
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateWorkoutPlanner;

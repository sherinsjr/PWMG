import { Flex, Heading } from '@chakra-ui/react';
import {
  ClientLogo,
  PlannerImage,
  WorkoutLibrary,
  Gymcart,
} from '../../assets';
import { SimpleCard } from '../../components/cards';

const Dashboard = () => {
  const cardData = [
    {
      title: 'Planner',
      image: PlannerImage,
      alt: 'Planner image',
      link: '/user/workout-plan',
    },
    {
      title: 'Workout Library',
      image: WorkoutLibrary,
      alt: 'Workout image',
      link: '/user/workoutlibrary',
    },
    {
      title: 'Clients',
      image: ClientLogo,
      alt: 'Workout image',
      link: '/user/clients',
    },
    {
      title: 'Gym Cart',
      image: Gymcart,
      alt: 'Workout image',
      link: '/user/products',
    },
  ];
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Dashboard</Heading>
      <Flex w='full' h='full' bg='#D9D9D9' rounded='1rem'>
        <Flex w='full' h='full' gap='8' alignItems='center' justify='center'>
          {cardData?.map((item, i) => (
            <SimpleCard
              key={i}
              title={item?.title}
              image={item?.image}
              alt={item?.alt}
              link={item?.link}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;

import { Flex, Heading } from '@chakra-ui/react';
import { Challenges, PlannerImage, WorkoutLibrary } from '../../assets';
import { SimpleCard } from '../../components/cards';

const Dashboard = () => {
  const cardData = [
    {
      title: 'Planner',
      image: PlannerImage,
      alt: 'Planner image',
      link: '/user/planner',
    },
    {
      title: 'Workout Library',
      image: WorkoutLibrary,
      alt: 'Workout image',
      link: '/user/workoutlibrary',
    },
    {
      title: 'Challenges',
      image: Challenges,
      alt: 'Challenges image',
      link: '/user/challenges',
    },
  ];
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Dashboard</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
      >
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

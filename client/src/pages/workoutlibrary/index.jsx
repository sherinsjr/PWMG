import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import {
  AbsImage,
  BackImage,
  BicepsImage,
  ChestImage,
  ForearmImage,
  LegsImage,
  ShoulderImage,
  TricepsImage,
} from '../../assets';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WorkoutLibrary = () => {
  const cardData = [
    {
      image: ChestImage,
      alt: 'Chest image',
      name: 'Chest',
      workoutLink: '/user/workoutlibrary/workout?workout=chest',
    },
    {
      image: TricepsImage,
      alt: 'Triceps image',
      name: 'Triceps',
      workoutLink: '/user/workoutlibrary/workout?workout=triceps',
    },
    {
      image: BackImage,
      alt: 'Back image',
      name: 'Back',
      workoutLink: '/user/workoutlibrary/workout?workout=back',
    },
    {
      image: ForearmImage,
      alt: 'Forearm image',
      name: 'Forearm',
      workoutLink: '/user/workoutlibrary/workout?workout=forearm',
    },
    {
      image: BicepsImage,
      alt: 'Biceps image',
      name: 'Biceps',
      workoutLink: '/user/workoutlibrary/workout?workout=biceps',
    },
    {
      image: LegsImage,
      alt: 'Legs image',
      name: 'Legs',
      workoutLink: '/user/workoutlibrary/workout?workout=legs',
    },
    {
      image: ShoulderImage,
      alt: 'Shoulder image',
      name: 'Shoulder',
      workoutLink: '/user/workoutlibrary/workout?workout=shoulder',
    },
    {
      image: AbsImage,
      alt: 'Abs image',
      name: 'Abs',
      workoutLink: '/user/workoutlibrary/workout?workout=abs',
    },
  ];
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Workout Library</Heading>
      <Flex
        w='full'
        h='full'
        bgGradient='linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)'
        rounded='1rem'
      >
        <Flex w='full' h='full' alignItems='center' justify='center'>
          <Flex
            w='full'
            flexWrap='wrap'
            gap='16'
            alignItems='center'
            justify='center'
          >
            {cardData?.map((item, index) => (
              <WorkoutLibCard
                key={index}
                image={item?.image}
                alt={item?.alt}
                name={item?.name}
                workoutLink={item?.workoutLink}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const WorkoutLibCard = ({ image, alt, name, workoutLink }) => (
  <Flex
    as={Link}
    to={workoutLink}
    w='13rem'
    h='15rem'
    direction='column'
    alignItems='center'
    justify='center'
    // bg="brand.cardBg"
    rounded='1rem'
    boxShadow='2xl'
  >
    <Image src={image} alt={alt} boxSize='10rem' />
    <Text fontWeight='bold'>{name}</Text>
  </Flex>
);

WorkoutLibCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.any,
  alt: PropTypes.string,
  workoutLink: PropTypes.string,
};

export default WorkoutLibrary;

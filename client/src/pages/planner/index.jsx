import { Flex, Heading } from '@chakra-ui/react';
import { EntriesImage, MealsImage } from '../../assets';
import { SimpleCard } from '../../components/cards';

const Planner = () => {
  const cardData = [
    {
      title: 'Entries',
      image: EntriesImage,
      alt: 'Planner image',
      link: '/user/planner/entries',
    },
    {
      title: 'Meals',
      image: MealsImage,
      alt: 'Workout image',
      link: '/user/planner/meals',
    },
  ];
  return (
    <Flex h='96%' w='75rem' direction='column' gap='5'>
      <Heading>Workout Planner</Heading>
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

export default Planner;

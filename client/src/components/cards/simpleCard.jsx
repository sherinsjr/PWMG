import { Flex, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SimpleCard = ({ title, image, alt, link }) => {
  return (
    <Flex
      as={Link}
      to={link}
      w='16rem'
      h='23rem'
      direction='column'
      alignItems='center'
      justify='center'
      bg='brand.cardBg'
      rounded='0.6rem'
      boxShadow='2xl'
    >
      <Flex>
        <Image src={image} alt={alt} boxSize='12rem' />
      </Flex>
      <Text
        fontSize={{ base: '1.5rem' }}
        fontWeight='bold'
        textTransform='uppercase'
        color='brand.white'
      >
        {title}
      </Text>
    </Flex>
  );
};

SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  alt: PropTypes.string,
  link: PropTypes.string,
};

export default SimpleCard;

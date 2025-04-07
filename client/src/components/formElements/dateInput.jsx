import { Flex, Input, Text } from '@chakra-ui/react';

const DateInput = ({ label, id, isRequired, labelColor, ...rest }) => {
  return (
    <Flex direction='column' alignItems='flex-start' w='100%'>
      <Text color={labelColor}>{label}</Text>
      <Input
        border='2px solid'
        borderColor='#3d3d3d'
        color='black'
        borderRadius='0.8rem'
        type='date'
        id={id}
        isRequired={isRequired}
        {...rest}
      />
    </Flex>
  );
};

export default DateInput;

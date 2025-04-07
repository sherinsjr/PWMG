import { Flex, Input, Text } from '@chakra-ui/react';

const FormInput = ({ label, type, id, isRequired, labelColor, ...rest }) => {
  return (
    <Flex direction='column' alignItems='flex-start' w='100%' gap='2'>
      <Text color={labelColor}>{label}</Text>
      <Input
        border='2px solid'
        borderColor='#3d3d3d'
        color='black'
        borderRadius='0.8rem'
        type={type}
        id={id}
        isRequired={isRequired}
        {...rest}
      />
    </Flex>
  );
};

export default FormInput;

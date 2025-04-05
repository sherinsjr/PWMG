import { Flex, Input, Text } from '@chakra-ui/react';

const FormInput = ({ label, type, id, isRequired, labelColor, ...rest }) => {
  return (
    <Flex direction='column' alignItems='flex-start' w='100%'>
      <Text color={labelColor}>{label}</Text>
      <Input
        border='none'
        borderBottom='2px solid'
        borderBottomColor='brand.mainTeal'
        color='brand.white'
        borderRadius='0'
        type={type}
        id={id}
        isRequired={isRequired}
        {...rest}
      />
    </Flex>
  );
};

export default FormInput;

import { FormControl, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const PasswordInput = ({ ...rest }) => {
  return (
    <FormControl>
      <Input
        bg='#6673E5CC'
        w='full'
        type='password'
        _placeholder={{ opacity: 0.9, color: '#ffffff' }}
        color='#ffffffCC'
        border='none'
        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
        {...rest}
      />
    </FormControl>
  );
};

PasswordInput.propTypes = {
  children: PropTypes.node,
  labelProps: PropTypes.object,
};

export default PasswordInput;

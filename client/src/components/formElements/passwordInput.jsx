import { FormControl, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const PasswordInput = ({ ...rest }) => {
  return (
    <FormControl>
      <Input
        bg='#7C898D'
        w='full'
        type='password'
        _placeholder={{ opacity: 0.9, color: '#ffffffCC' }}
        color='#ffffffCC'
        border='none'
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

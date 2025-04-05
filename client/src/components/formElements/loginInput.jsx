import { FormControl, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const LoginInput = ({ type, ...rest }) => {
  return (
    <FormControl>
      <Input
        bg='#7C898D'
        w='full'
        type={type}
        _placeholder={{ opacity: 0.9, color: '#ffffffCC' }}
        color='#ffffffCC'
        border='none'
        {...rest}
      />
    </FormControl>
  );
};

LoginInput.propTypes = {
  type: PropTypes.string,
};

export default LoginInput;

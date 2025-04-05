import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SimpleButton = ({ children, ...rest }) => {
  return (
    <Button variant={'unstyled'} {...rest}>
      {children}
    </Button>
  );
};

SimpleButton.propTypes = {
  children: PropTypes.node,
};

export default SimpleButton;

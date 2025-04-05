import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MainModal = ({
  title,
  children,
  footerContent,
  isOpen,
  onClose,
  size,
  ...rest
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay backdropFilter='blur(8px)' />
      <ModalContent
        borderRadius='0.8rem'
        boxShadow='0 4px 6px rgba(0, 0, 0, 0.2)'
        bg='#D9D9D9'
        {...rest}
      >
        <ModalHeader color='brand.dark' fontSize='2xl'>
          {title}
        </ModalHeader>
        <ModalCloseButton color='brand.dark' />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

MainModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalCloseButtonFunction: PropTypes.func,
  size: PropTypes.string,
};

export default MainModal;

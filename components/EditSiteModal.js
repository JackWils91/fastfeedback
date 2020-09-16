import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
  Switch
} from '@chakra-ui/core';

import { createSite, updateSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const EditSiteModal = ({ settings, siteId, children }) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onEditSite = async (fields) => {
    await updateSite(siteId, {
      settings: fields
    });

    toast({
      title: 'Success!',
      description: "We've updated your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(['/api/sites', auth.user.token]);
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon="settings"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Switch
                key={settings?.timestamp}
                name="timestamp"
                ref={register()}
                // id="show-timestamp"
                color="green"
                defaultIsChecked={settings?.timestamp}
              />
              <FormLabel ml={2} htmlFor="show-timestamp">
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.icons}
                name="icon"
                ref={register()}
                // id="show-icon"
                color="green"
                defaultIsChecked={settings?.icons}
              />
              <FormLabel ml={2} htmlFor="show-icon">
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.ratings}
                name="ratings"
                ref={register()}
                // id="show-ratings"
                color="green"
                defaultIsChecked={settings?.ratings}
              />
              <FormLabel ml={2} htmlFor="show-ratings">
                Show Ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;

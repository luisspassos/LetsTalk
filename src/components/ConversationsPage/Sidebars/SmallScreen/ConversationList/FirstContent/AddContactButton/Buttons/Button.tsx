import { Button as ChakraButton } from '@chakra-ui/react';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { label } from 'components/ConversationsPage/Sidebars/ConversationsListBase/FirstContent/AddContactButton/IconButton';

export function Button() {
  const { onOpen } = useAddContactModal();

  return (
    <ChakraButton
      onClick={onOpen}
      width='15em'
      justifyContent='start'
      boxShadow='base'
      height={['36px', '10']}
      fontWeight='normal'
      fontSize={['15px', 'md']}
      leftIcon={<AiOutlineUserAdd size='1.4em' />}
    >
      {label}
    </ChakraButton>
  );
}

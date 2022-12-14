import { Button as ChakraButton } from '@chakra-ui/react';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';

type ButtonProps = {
  text: string;
};

export function Button({ text }: ButtonProps) {
  const { onOpen } = useAddContactModal();

  return (
    <ChakraButton
      onClick={onOpen}
      width='100%'
      my='5px'
      justifyContent='start'
      boxShadow='base'
      height={['36px', '10']}
      fontWeight='normal'
      fontSize={['15px', 'md']}
      leftIcon={<AiOutlineUserAdd size='1.4em' />}
    >
      {text}
    </ChakraButton>
  );
}

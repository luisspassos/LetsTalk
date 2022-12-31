import { Tooltip } from 'components/Tooltip';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  IconButton as ChakraIconButton,
  useColorModeValue,
} from '@chakra-ui/react';

type IconButtonProps = {
  label: string;
};

export function IconButton({ label }: IconButtonProps) {
  const { onOpen } = useAddContactModal();

  return (
    <Tooltip ariaLabel={label} label={label} hasArrow={false}>
      <ChakraIconButton
        onClick={onOpen}
        aria-label={label}
        icon={<AiOutlineUserAdd />}
        transitionProperty='unset'
        transitionDuration='200ms'
        _hover={useColorModeValue(
          {
            bg: 'auto',
            filter: 'brightness(1.1)',
          },
          undefined
        )}
        boxShadow='base'
        fontSize='28px'
        display={['none', null, 'inline-flex']}
        size='lg'
      />
    </Tooltip>
  );
}

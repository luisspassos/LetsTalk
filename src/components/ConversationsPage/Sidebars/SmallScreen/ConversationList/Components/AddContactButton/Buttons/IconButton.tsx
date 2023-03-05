import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  IconButton as ChakraIconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';

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
        icon={<AiOutlineUserAdd size='60%' />}
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
        display='inline-flex'
        w='2.73625rem'
        h='unset'
        sx={{
          aspectRatio: '1 / 1',
        }}
      />
    </Tooltip>
  );
}

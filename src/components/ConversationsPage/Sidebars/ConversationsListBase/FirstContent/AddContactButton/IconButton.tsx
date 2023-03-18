import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';

export const label = 'Adicionar contato';

type BaseProps = {
  width: IconButtonProps['width'];
};

export function Base(props: BaseProps) {
  const { onOpen } = useAddContactModal();

  return (
    <Tooltip ariaLabel={label} label={label} hasArrow={false}>
      <ChakraIconButton
        onClick={onOpen}
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
        h='unset'
        sx={{
          aspectRatio: '1 / 1',
        }}
        aria-label={label}
        {...props}
      />
    </Tooltip>
  );
}

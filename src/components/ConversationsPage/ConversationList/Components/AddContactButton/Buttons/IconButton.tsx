import { Tooltip } from 'components/Tooltip';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

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
        boxShadow='base'
        fontSize='28px'
        display={['none', null, 'inline-flex']}
        size='lg'
      />
    </Tooltip>
  );
}

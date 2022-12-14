import { Button, Hide, IconButton, Show } from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useAddContactModal } from '../../../../contexts/Modal/AddContactModalContext';

export function AddContactButton() {
  const { onOpen } = useAddContactModal();

  const ariaLabel = 'Adicionar contato';

  return (
    <>
      <Show above='md'>
        <Tooltip ariaLabel={ariaLabel} label={ariaLabel} hasArrow={false}>
          <IconButton
            onClick={onOpen}
            aria-label={ariaLabel}
            icon={<AiOutlineUserAdd />}
            boxShadow='base'
            fontSize='28px'
            display={['none', null, 'inline-flex']}
            size='lg'
          />
        </Tooltip>
      </Show>
      <Hide above='md'>
        <Button
          width='100%'
          my='5px'
          justifyContent='start'
          boxShadow='base'
          height={['36px', '10']}
          fontWeight='normal'
          fontSize={['15px', 'md']}
          leftIcon={<AiOutlineUserAdd size='1.4em' />}
        >
          Adicionar contato
        </Button>
      </Hide>
    </>
  );
}

import { IconButton, Show } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { Icon } from './Icon';

export function Button() {
  const { onToggle } = useTabToggle();

  return (
    <Show breakpoint='(max-width: 870px)'>
      <IconButton
        variant='ghost'
        icon={<Icon />}
        aria-label='Botão de alternar aba ao lado'
        onClick={onToggle}
      />
    </Show>
  );
}

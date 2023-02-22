import { Show } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { breakpoints } from 'styles/breakpoints';
import { IconButton } from '../../../IconButton';
import { Icon } from './Icon';

export function Button() {
  const { onToggle } = useTabToggle();

  return (
    <Show breakpoint={`(max-width: ${breakpoints.sidebar.value})`}>
      <IconButton
        icon={<Icon />}
        aria-label='Botão de alternar aba ao lado'
        onClick={onToggle}
      />
    </Show>
  );
}

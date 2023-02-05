import { IconButton } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { Icon } from './Icon';

export function Button() {
  const { onToggle } = useTabToggle();

  return (
    <IconButton
      variant='ghost'
      icon={<Icon />}
      aria-label='Botão de alternar aba ao lado'
      onClick={onToggle}
    />
  );
}

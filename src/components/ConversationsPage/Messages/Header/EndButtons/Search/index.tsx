import { HiSearch } from 'react-icons/hi';
import { IconButton } from '../../IconButton';

export function Search() {
  return (
    <IconButton
      aria-label='Pesquisar na conversa'
      icon={<HiSearch />}
      mr={['-0.1rem', '0.5rem']}
    />
  );
}

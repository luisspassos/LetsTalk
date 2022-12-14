import { HiSearch } from 'react-icons/hi';
import { Button } from '../Button';

export function Search() {
  return (
    <Button
      aria-label='Pesquisar na conversa'
      icon={<HiSearch />}
      fontSize={['21px', '24px', '27px']}
    />
  );
}

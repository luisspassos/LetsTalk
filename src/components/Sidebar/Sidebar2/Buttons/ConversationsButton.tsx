import { usePageIsSelected } from 'hooks/usePageIsSelected';
import { useRouter } from 'next/router';
import { MdMessage, MdOutlineMessage } from 'react-icons/md';
import { Button } from './Button';

export function ConversationsButton() {
  const page = 'conversas';

  const router = useRouter();
  const isSelected = usePageIsSelected(page);

  return (
    <Button
      onClick={() => router.push(`/${page}`)}
      isSelected={isSelected}
      icon={isSelected ? <MdMessage /> : <MdOutlineMessage />}
      aria-label='Mensagens'
    />
  );
}

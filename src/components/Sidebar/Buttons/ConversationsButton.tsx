import { useTab } from 'contexts/TabContext';
import { MdMessage, MdOutlineMessage } from 'react-icons/md';
import { Button } from './Button';

export function ConversationsButton() {
  const { handleChangeTab, tab } = useTab();

  const isSelected = tab === 'conversations';

  return (
    <Button
      onClick={() => handleChangeTab('conversations')}
      isSelected={isSelected}
      icon={isSelected ? <MdMessage /> : <MdOutlineMessage />}
      aria-label='Mensagens'
    />
  );
}

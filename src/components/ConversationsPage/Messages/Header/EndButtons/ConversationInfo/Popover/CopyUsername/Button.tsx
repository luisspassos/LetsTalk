import { Icon } from '@chakra-ui/react';
import { RiFileCopy2Line } from 'react-icons/ri';
import { Button } from '../Button';
import { useCallback, useState } from 'react';
import { useConversations } from 'contexts/ConversationsContext';
import { Tooltip } from './Tooltip';

export function CopyUsernameButton() {
  const { currentConversation } = useConversations();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyUsername = useCallback(() => {
    navigator.clipboard.writeText(currentConversation.data?.username ?? '');
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  }, [currentConversation.data?.username]);

  return (
    <Tooltip isOpen={showTooltip}>
      <Button
        text='Copiar nome do contato'
        colorScheme='gray'
        leftIcon={<Icon as={RiFileCopy2Line} />}
        onClick={handleCopyUsername}
      />
    </Tooltip>
  );
}

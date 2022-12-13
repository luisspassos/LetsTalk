import { DangerousActionIcon } from 'components/Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from 'components/Modal/DangerousAction/DangerousActionModalTitle';
import { useConversations } from 'contexts/ConversationsContext';
import { BiBlock } from 'react-icons/bi';
import { CgUnblock } from 'react-icons/cg';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const { currentConversation } = useConversations();

  const icon = currentConversation.data?.isBlocked ? CgUnblock : BiBlock;

  return (
    <>
      <DangerousActionIcon Icon={icon} />
      <DangerousActionModalTitle
        text={`Você deseja ${title} ${currentConversation.data?.name}?`}
      />
    </>
  );
}

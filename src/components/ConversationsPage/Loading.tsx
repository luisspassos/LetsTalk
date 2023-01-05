import { Loading as LoadingComponent } from 'components/Loading';
import { useConversations } from 'contexts/ConversationsContext';
import { useEffect, useState } from 'react';

export function Loading() {
  const [active, setActive] = useState(true);

  const {
    conversations: { numberOfConversations },
  } = useConversations();

  useEffect(() => {
    function disableLoading() {
      if (numberOfConversations !== undefined) setActive(false);
    }

    disableLoading();
  }, [numberOfConversations]);

  return <LoadingComponent active={active} />;
}

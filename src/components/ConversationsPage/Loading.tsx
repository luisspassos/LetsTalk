import { Loading as LoadingComponent } from 'components/Loading';
import { useConversations } from 'contexts/ConversationsContext';
import { useEffect, useState } from 'react';

export function Loading() {
  const [active, setActive] = useState(true);

  const {
    conversations: { data: conversations },
  } = useConversations();

  useEffect(() => {
    function disableLoading() {
      if (conversations !== null) setActive(false);
    }

    disableLoading();
  }, [conversations]);

  return <LoadingComponent active={active} />;
}

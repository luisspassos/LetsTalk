import {
  DangerousActionButtons,
  DangerousActionButtonsProps,
} from 'components/Modal/DangerousAction/DangerousActionButtons';
import { useAuth } from 'contexts/AuthContext';
import { useConversations } from 'contexts/ConversationsContext';
import { useBlockUserModal } from 'contexts/Modal/BlockUserModalContext';
import { doc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from 'services/firebase';
import { getDocumentFromCurrentConversation } from 'utils/getDocumentFromCurrentConversation';

type ButtonsProps = {
  confirmButtonText: DangerousActionButtonsProps['confirmButtonText'];
};

export function Buttons({ confirmButtonText }: ButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { onClose } = useBlockUserModal();
  const { user } = useAuth();
  const {
    currentConversation,
    conversations: { data: conversations, setConversations },
  } = useConversations();

  const getContactInfoRef = useCallback(async () => {
    if (!user || !currentConversation.data?.uid) return;

    const { conversationDocWithContact } =
      await getDocumentFromCurrentConversation(
        user?.uid,
        currentConversation.data?.uid
      );

    const conversationDocWithContactId = conversationDocWithContact?.id;

    if (!conversationDocWithContactId) return;

    const contactInfoRef = doc(
      db,
      'conversations',
      conversationDocWithContactId,
      'usersInformation',
      currentConversation.data?.uid
    );

    return contactInfoRef;
  }, [currentConversation.data?.uid, user]);

  const setIsBlocked = useCallback(
    (isBlocked: boolean) => {
      if (conversations === null) return;

      const conversationsClone = [...conversations];

      conversationsClone[currentConversation.index].isBlocked = isBlocked;

      setConversations(conversationsClone);
    },
    [conversations, currentConversation.index, setConversations]
  );

  const handleToggleBlockUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const { updateDoc } = await import('firebase/firestore');
      const contactInfoRef = await getContactInfoRef();

      if (!contactInfoRef) return;

      const isBlocked = currentConversation.data?.isBlocked ? false : true;

      await updateDoc(contactInfoRef, {
        isBlocked,
      });

      setIsBlocked(isBlocked);
    } catch {
      const { unknownErrorToast } = await import(
        'utils/Toasts/unknownErrorToast'
      );

      unknownErrorToast();
    } finally {
      onClose();
      setIsLoading(false);
    }
  }, [
    currentConversation.data?.isBlocked,
    getContactInfoRef,
    onClose,
    setIsBlocked,
  ]);

  return (
    <DangerousActionButtons
      cancelButtonProps={{
        onClick: onClose,
      }}
      confirmButtonProps={{
        onClick: handleToggleBlockUser,
        isLoading,
      }}
      confirmButtonText={confirmButtonText}
    />
  );
}

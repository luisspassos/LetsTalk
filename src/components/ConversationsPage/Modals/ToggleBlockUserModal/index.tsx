import { Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiBlock } from 'react-icons/bi';
import { CgUnblock } from 'react-icons/cg';
import { useAuth } from '../../../../contexts/AuthContext';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { useBlockUserModal } from '../../../../contexts/Modal/BlockUserModalContext';
import { db } from '../../../../services/firebase';
import { getDocumentFromCurrentConversation } from '../../../../utils/getDocumentFromCurrentConversation';
import { DangerousActionButtons } from '../../../Modal/DangerousAction/DangerousActionButtons';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';
import { ModalWrapper } from '../../../Modal/ModalWrapper';

type ContactInfoData = {
  isBlocked?: boolean;
};

export function ToggleBlockUserModal() {
  const { isOpen, onClose } = useBlockUserModal();
  const {
    currentConversation,
    conversations: { data: conversations, setConversations },
  } = useConversations();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const setIsBlocked = useCallback(
    (isBlocked: boolean) => {
      const conversationsClone = [...conversations];

      conversationsClone[currentConversation.index].isBlocked = isBlocked;

      setConversations(conversationsClone);
    },
    [conversations, currentConversation.index, setConversations]
  );

  const modalAction = useMemo(
    () =>
      currentConversation.data?.isBlocked
        ? {
            text: 'desbloquear',
            icon: CgUnblock,
          }
        : {
            text: 'bloquear',
            icon: BiBlock,
          },
    [currentConversation.data?.isBlocked]
  );

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

  useEffect(() => {
    if (currentConversation.data?.isBlocked !== undefined) return;

    async function checkIfUserIsBlockedOrNot() {
      const contactInfoRef = await getContactInfoRef();

      if (!contactInfoRef) return;

      const contactInfoSnap = await getDoc(contactInfoRef);
      const contactInfoData = contactInfoSnap.data() as ContactInfoData;

      if (contactInfoData.isBlocked) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    }

    checkIfUserIsBlockedOrNot();
  }, [
    getContactInfoRef,
    currentConversation.data?.isBlocked,
    conversations,
    currentConversation.index,
    setConversations,
    setIsBlocked,
  ]);

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
        '../../../../utils/Toasts/unknownErrorToast'
      );

      unknownErrorToast();
    } finally {
      onClose();
      setIsLoading(false);
    }
  }, [
    getContactInfoRef,
    onClose,
    currentConversation.data?.isBlocked,
    setIsBlocked,
  ]);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center' gap={['6px', '8px', '10px']}>
        <DangerousActionIcon Icon={modalAction.icon} />
        <DangerousActionModalTitle
          text={`Você deseja ${modalAction.text} ${currentConversation.data?.name}?`}
        />
        <DangerousActionButtons
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonProps={{
            onClick: handleToggleBlockUser,
            isLoading,
          }}
          confirmButtonText={modalAction.text}
        />
      </Flex>
    </ModalWrapper>
  );
}

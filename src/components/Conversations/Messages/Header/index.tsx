import { Box, Flex, Popover, PopoverTrigger, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { Tooltip } from '../../../Tooltip';
import { Divider } from '../../../Divider';
import { ContactName } from './ContactName';
import { ConversationInfoIconButton } from './ConversationInfo/IconButton';
import { ConversationInfoPopover } from './ConversationInfo/Popover';
import { ConversationsTabToggleButton } from './ConversationsTabToggleButton';
import { onSnapshot } from 'firebase/firestore';
import { db } from '../../../../services/firebase';
import { doc } from 'firebase/firestore';
import { OnlineAt as OnlineAtType } from '../../../../utils/types';
import { formatContactOnlineAt } from '../../../../utils/formatDate';
import { useConversationPopover } from '../../../../contexts/ConversationPopoverContext';
import { Wrapper } from './Wrapper';
import { Avatar } from './Avatar';
import { OnlineAt } from './OnlineAt';

type OnlineAtFormatted = string;

type ContactDocumentData = {
  onlineAt: OnlineAtType;
  uid: string;
};

export function Header() {
  const [onlineAt, setOnlineAt] = useState<OnlineAtFormatted>();

  const popoverInitialFocusRef = useRef(null);

  const { currentConversation } = useConversations();
  const { isOpen, onClose } = useConversationPopover();

  useEffect(() => {
    if (!currentConversation.data?.username) return;

    const unsub = onSnapshot(
      doc(db, 'users', currentConversation.data.username),
      (doc) => {
        const docData = doc.data() as ContactDocumentData;

        const onlineAtFormatted = formatContactOnlineAt(docData.onlineAt);

        setOnlineAt(onlineAtFormatted);
      }
    );

    return () => {
      unsub();
    };
  }, [currentConversation.data?.username]);

  return (
    <>
      <Wrapper>
        <Flex minW={0} align='center' gap={['12px', '15px', '18px']}>
          <ConversationsTabToggleButton />

          <Avatar photoURL={currentConversation.data?.photoURL} />

          <VStack minW={0} align='start' spacing={0}>
            <ContactName text={currentConversation.data?.name ?? ''} />
            <OnlineAt text={onlineAt ?? ''} />
          </VStack>
        </Flex>
        <Popover
          initialFocusRef={popoverInitialFocusRef}
          placement='bottom-start'
          isOpen={isOpen}
          onClose={onClose}
        >
          <Tooltip
            ariaLabel='Informações da conversa'
            label='Informações da conversa'
            placement='bottom-start'
          >
            <Box display='inline-block'>
              <PopoverTrigger>
                <Box display='inline-block'>
                  <ConversationInfoIconButton />
                </Box>
              </PopoverTrigger>
            </Box>
          </Tooltip>

          <ConversationInfoPopover ref={popoverInitialFocusRef} />
        </Popover>
      </Wrapper>
      <Divider />
    </>
  );
}

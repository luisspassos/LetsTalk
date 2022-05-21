import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
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

type OnlineAt = number | 'now';

type ContactDocumentData = {
  onlineAt: OnlineAt;
  uid: string;
};

export function Header() {
  const [onlineAt, setOnlineAt] = useState<OnlineAt>();

  const popoverInitialFocusRef = useRef(null);

  const { currentConversation } = useConversations();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'users', currentConversation.data.username),
      (doc) => {
        const docData = doc.data() as ContactDocumentData;

        setOnlineAt(docData.onlineAt);
      }
    );

    return () => {
      unsub();
    };
  }, [currentConversation.data.username]);

  return (
    <>
      <Flex
        flexShrink={0}
        as='header'
        justify='space-between'
        minW={0}
        h={['55px', '70px', '85px']}
        minH={0}
        align='center'
        gap='9px'
      >
        <Flex minW={0} align='center' gap={['12px', '15px', '18px']}>
          <ConversationsTabToggleButton />

          <Avatar
            w={['42px', '47px', '52px']}
            h={['42px', '47px', '52px']}
            src={currentConversation.data.photoURL ?? undefined}
          />

          <VStack minW={0} align='start' spacing={0}>
            <ContactName text={currentConversation.data.name} />
            <Text as='time' fontSize={['12px', '13px', '14px']} opacity='80%'>
              {onlineAt}
            </Text>
          </VStack>
        </Flex>
        <Popover
          initialFocusRef={popoverInitialFocusRef}
          placement='bottom-start'
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
      </Flex>
      <Divider />
    </>
  );
}

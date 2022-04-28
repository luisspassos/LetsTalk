import { Flex, VStack } from '@chakra-ui/react';
import { ConversationDivider } from './ConversationDivider';
import { Avatar } from './Avatar';
import { Name } from './Name';
import { LastMessage } from './LastMessage';
import { LastMessageTime } from './LastMessageTime';
import { NumberOfUnreadMessages } from './NumberOfUnreadMessages';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { useEffect, useMemo } from 'react';

type ConversationProps = {
  data: {
    name: string;
    photoURL: string | null;
    lastMessage: string;
    updatedAtFormatted: string;
    unreadMessages: number;
  };
  index: number;
  numberOfConversations: number;
};

export function Conversation({
  data: { name, photoURL, lastMessage, updatedAtFormatted, unreadMessages },
  index,
  numberOfConversations,
}: ConversationProps) {
  const lastItem = index === numberOfConversations - 1;
  const unreadMessagesFormatted = useMemo(() => {
    return unreadMessages > 999 ? '999+' : unreadMessages;
  }, [unreadMessages]);

  const {
    conversations: { data: conversations, changeConversationsState },
    currentConversation: {
      data: currentConversation,
      index: currentConversationIndex,
      changeCurrentConversationIndex,
      clearUnreadMessages,
    },
  } = useConversations();

  const isCurrentTab = useMemo(
    () => index === currentConversationIndex,
    [currentConversationIndex, index]
  );

  useEffect(() => {
    if (isCurrentTab) {
      clearUnreadMessages();
    }
  }, [currentConversation?.unreadMessages, isCurrentTab, clearUnreadMessages]);

  useEffect(() => {
    if (!conversations[index]?.messages) return;

    const prevConversations = [...conversations];

    changeConversationsState(
      prevConversations.map((conversation, i) => {
        if (index === i && conversation?.uid) {
          return {
            ...conversation,
            updatedAtFormatted:
              conversation.messages?.pop()?.createdAtFormatted ??
              conversation.updatedAtFormatted,
          };
        }

        return conversation;
      })
    );
  }, [conversations, index, changeConversationsState]);

  return (
    <>
      <Flex
        w='100%'
        px={['19px', '22px', '25px']}
        alignItems='center'
        py='7px'
        h={['65px', '75px', '85px']}
        flexShrink='0'
        cursor='pointer'
        transition='0.2s'
        bg={isCurrentTab ? 'grayAlpha.500' : undefined}
        _hover={{
          bg: 'grayAlpha.500',
        }}
        onClick={() => changeCurrentConversationIndex(index)}
      >
        <Avatar photoURL={photoURL} />
        <Flex justify='space-between' flex='1'>
          <VStack
            spacing={['-1px', '-0.5px', 0]}
            alignItems='start'
            justify='center'
          >
            <Name text={name} />
            <LastMessage text={lastMessage} />
          </VStack>
          <VStack spacing={['1px', '1.5px', '2px']} h='100%' align='end'>
            <LastMessageTime text={updatedAtFormatted} />
            {unreadMessages && !isCurrentTab && (
              <NumberOfUnreadMessages number={unreadMessagesFormatted} />
            )}
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}

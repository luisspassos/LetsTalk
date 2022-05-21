import { Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { ConversationDivider } from './ConversationDivider';
import { Avatar } from './Avatar';
import { Name } from './Name';
import { LastMessage } from './LastMessage';
import { LastMessageTime } from './LastMessageTime';
import { NumberOfUnreadMessages } from './NumberOfUnreadMessages';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { useCallback } from 'react';

type ConversationProps = {
  data: {
    name: string;
    photoURL: string | null;
    updatedAt: string;
    lastMessage: string;
  };
  index: number;
  numberOfConversations: number;
};

export function Conversation({
  data: { name, photoURL, updatedAt, lastMessage },
  index,
  numberOfConversations,
}: ConversationProps) {
  const lastItem = index === numberOfConversations - 1;

  const {
    currentConversation: {
      data: currentConversation,
      changeCurrentConversationIndex,
    },
    conversations: { data: conversations },
  } = useConversations();

  const bg = useColorModeValue('grayAlpha.500', 'whiteAlpha.100');

  const handleChangeCurrentConversation = useCallback(() => {
    changeCurrentConversationIndex(
      conversations.findIndex((conversation) => conversation.name === name)
    );
  }, [changeCurrentConversationIndex, conversations, name]);

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
        bg={name === currentConversation.name ? bg : undefined}
        _hover={{
          bg: bg,
        }}
        onClick={handleChangeCurrentConversation}
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
            <LastMessageTime text={updatedAt} />
            <NumberOfUnreadMessages number={2} />
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}

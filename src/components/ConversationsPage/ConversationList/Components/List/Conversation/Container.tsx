import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useConversations } from 'contexts/ConversationsContext';

type ContainerProps = {
  children: ReactNode;
  conversationHeight: number;
  paddingToBeRemoved: string;
  name: string;
};

export function Container({
  children,
  conversationHeight,
  paddingToBeRemoved,
  name,
}: ContainerProps) {
  const {
    currentConversation: {
      data: currentConversation,
      changeCurrentConversationIndex,
    },
    conversations: { data: conversations },
  } = useConversations();

  const bg = useColorModeValue('grayAlpha.500', 'whiteAlpha.100');

  function handleChangeCurrentConversation() {
    const newIndex = conversations?.findIndex(
      (conversation) => conversation.name === name
    );

    if (newIndex === undefined) return;

    changeCurrentConversationIndex(newIndex);
  }

  const isSelected = name === currentConversation?.name;

  return (
    <Flex
      w='100%'
      px={paddingToBeRemoved}
      // px={['19px', '22px', '25px']}
      alignItems='center'
      marginInline={`-${paddingToBeRemoved}`}
      py='7px'
      h={`${conversationHeight}px`}
      flexShrink={0}
      cursor='pointer'
      transition='0.2s'
      bg={isSelected ? bg : 'current'}
      _hover={{
        bg,
      }}
      onClick={handleChangeCurrentConversation}
    >
      {children}
    </Flex>
  );
}

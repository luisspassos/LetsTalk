import { Flex, useColorModeValue } from '@chakra-ui/react';
import { styles } from 'components/ConversationsPage/Sidebars/SmallScreen';
import { useConversations } from 'contexts/ConversationsContext';
import { useElementWidth } from 'hooks/useElementWidth';

export type ChildrenProps = {
  containerWidth: number;
};

type ContainerProps = {
  children: (props: ChildrenProps) => JSX.Element;
  name: string;
};

export function Container({ children, name }: ContainerProps) {
  const { ref, width: containerWidth } = useElementWidth<HTMLDivElement>();

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
      ref={ref}
      px={styles.px}
      alignItems='center'
      flexShrink={0}
      cursor='pointer'
      transition='0.2s background'
      bg={isSelected ? bg : undefined}
      _hover={{
        bg,
      }}
      onClick={handleChangeCurrentConversation}
      h='5em'
    >
      {children({ containerWidth })}
    </Flex>
  );
}

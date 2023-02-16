import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useConversations } from 'contexts/ConversationsContext';

type ContainerProps = {
  children: ReactNode;
  padding: string;
  name: string;
};

export function Container({ children, padding, name }: ContainerProps) {
  const {
    currentConversation: {
      data: currentConversation,
      changeCurrentConversationIndex,
    },
    conversations: { data: conversations },
  } = useConversations();

  const ref = useRef<HTMLDivElement>(null);

  const [offsetWidth, setOffsetWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const newOffsetWidth = element?.offsetWidth;

    if (newOffsetWidth === undefined) return;

    setOffsetWidth(newOffsetWidth);
  }, []);

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
      w='100%'
      px={padding}
      alignItems='center'
      flexShrink={0}
      cursor='pointer'
      transition='0.2s'
      bg={isSelected ? bg : undefined}
      _hover={{
        bg,
      }}
      onClick={handleChangeCurrentConversation}
      sx={{
        aspectRatio: '1 / 0.27',
      }}
    >
      {children}
    </Flex>
  );
}

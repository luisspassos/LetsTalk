import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useConversations } from 'contexts/ConversationsContext';

export type ChildrenProps = {
  containerWidth: number;
};

type ContainerProps = {
  children: (props: ChildrenProps) => JSX.Element;
  padding: string;
  name: string;
};

export function Container({ children, padding, name }: ContainerProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  // get container width
  useEffect(() => {
    const element = ref.current;

    if (element === null) return;

    function getContainerWidth() {
      const element = ref.current;
      const newOffsetWidth = element?.offsetWidth;

      if (newOffsetWidth === undefined) return;

      setContainerWidth(newOffsetWidth);
    }

    const observer = new ResizeObserver(getContainerWidth);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

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
      w='100%'
      px={padding}
      alignItems='center'
      flexShrink={0}
      cursor='pointer'
      transition='0.2s background'
      bg={isSelected ? bg : undefined}
      _hover={{
        bg,
      }}
      onClick={handleChangeCurrentConversation}
      sx={{
        aspectRatio: '1 / 0.27',
      }}
    >
      {children({ containerWidth })}
    </Flex>
  );
}

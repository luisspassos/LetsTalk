import { Flex, VStack } from '@chakra-ui/react';
import { ConversationDivider } from './ConversationDivider';
import { Avatar } from './Avatar';
import { Name } from './Name';
import { LastMessage } from './LastMessage';
import { LastMessageTime } from './LastMessageTime';
import { NumberOfUnreadMessages } from './NumberOfUnreadMessages';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMessages } from '../../../../contexts/MessageContext';
import { useConversations } from '../../../../contexts/ConversationsContext';

type ConversationProps = {
  data: {
    name: string;
    photoURL: string | null;
    lastMessage: string;
    updatedAt: number;
  };
  index: number;
  numberOfConversations: number;
};

export function Conversation({
  data: { name, photoURL, lastMessage, updatedAt },
  index,
  numberOfConversations,
}: ConversationProps) {
  const [isSelected, setIsSelected] = useState(false);

  const lastItem = index === numberOfConversations - 1;

  const { messageData, changeMessageDataState } = useMessages();
  const { conversations } = useConversations();

  useEffect(() => {
    const selectedConversation = messageData?.name === name;

    setIsSelected(selectedConversation);
  }, [messageData?.name, name]);

  const updatedAtFormatted = useMemo(() => {
    function formatUpdateAt() {
      let updatedAtFormatted = '';

      const updatedAtDate = new Date(updatedAt).toLocaleString('pt-br');
      const isToday = Date.now() - updatedAt < 86400000; // (86400000) one day in milliseconds
      const [date, hours] = updatedAtDate.split(' ');

      if (isToday) {
        updatedAtFormatted = hours.slice(0, 5);
      } else {
        updatedAtFormatted = date;
      }

      return updatedAtFormatted;
    }

    return formatUpdateAt();
  }, [updatedAt]);

  const handleSelectConversation = useCallback(
    (index: number) => {
      const { photoURL, name: contactName } = conversations[index];

      if (messageData?.name === name) return;

      changeMessageDataState({
        name: contactName,
        photoURL,
      });
    },
    [changeMessageDataState, conversations, messageData?.name, name]
  );

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
        bg={isSelected ? 'grayAlpha.500' : undefined}
        _hover={{
          bg: 'grayAlpha.500',
        }}
        onClick={() => handleSelectConversation(index)}
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
            <NumberOfUnreadMessages number={2} />
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}

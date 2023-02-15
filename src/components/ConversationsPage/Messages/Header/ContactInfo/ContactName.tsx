import { Heading } from '@chakra-ui/react';
import { useConversations } from '../../../../../contexts/ConversationsContext';

export function ContactName() {
  const { currentConversation } = useConversations();

  return (
    <Heading
      w='100%'
      maxW='700px'
      textOverflow='ellipsis'
      overflow='hidden'
      whiteSpace='nowrap'
      fontSize={['15px', '16px', '17px']}
      fontWeight={400}
    >
      {currentConversation.data?.name}
    </Heading>
  );
}

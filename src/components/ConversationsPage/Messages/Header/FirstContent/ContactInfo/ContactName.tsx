import { Heading } from '@chakra-ui/react';
import { useConversations } from 'contexts/ConversationsContext';
import { ContactInfoProps } from '.';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';

type ContactNameProps = ContactInfoProps;

export function ContactName({ parentWidth }: ContactNameProps) {
  const { currentConversation } = useConversations();

  const { fontSize } = useFontSizeBasedOnWidth(parentWidth, 48);

  return (
    <Heading
      w='90%'
      isTruncated
      // fontSize={fontSize}
      fontSize='1em'
      fontWeight={400}
    >
      {/* {currentConversation.data?.name} */}
      luisssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss🐵❤️😓😒😒
    </Heading>
  );
}

import { Flex, VStack } from '@chakra-ui/react';
import { ConversationDivider } from './ConversationDivider';
import { Avatar } from './Avatar';
import { Name } from './Name';
import { LastMessage } from './LastMessage';
import { LastMessageTime } from './LastMessageTime';
import { NumberOfUnreadMessages } from './NumberOfUnreadMessages';

type ConversationProps = {
  name: string;
  photoURL: string | null;
  index: number;
  numberOfConversations: number;
};

export function Conversation({
  name,
  photoURL,
  index,
  numberOfConversations,
}: ConversationProps) {
  const lastItem = index === numberOfConversations - 1;

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
        bg={index === 0 ? 'grayAlpha.500' : undefined}
        _hover={{
          bg: 'grayAlpha.500',
        }}
      >
        <Avatar photoURL={photoURL ?? undefined} />
        <Flex justify='space-between' flex='1'>
          <VStack spacing={['-1px', '-0.5px', 0]} alignItems='start'>
            <Name text={name} />
            <LastMessage text='ta bommmmmmmmmmmmmm' />
          </VStack>
          <VStack spacing={['1px', '1.5px', '2px']} h='100%' align='end'>
            <LastMessageTime text='19:48' />
            <NumberOfUnreadMessages number={2} />
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}

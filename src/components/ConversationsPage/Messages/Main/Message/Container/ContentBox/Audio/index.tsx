import { Flex, useColorModeValue } from '@chakra-ui/react';
import { AudioContextsProvider } from 'components/Audio/AudioContextsProvider';
import { Message } from 'components/ConversationsPage/Messages/Main';
import { Avatar } from './Avatar';
import { InteractiveElements } from './InteractiveElements';

type AudioComponentProps = {
  index: number;
  isContact: Message['contactMessage'];
};

export function AudioComponent({ index, isContact }: AudioComponentProps) {
  return (
    <Flex
      color={useColorModeValue('blue.500', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
      gap='.9em'
    >
      <Avatar isContact={isContact} />
      <AudioContextsProvider>
        <InteractiveElements index={index} />
      </AudioContextsProvider>
    </Flex>
  );
}

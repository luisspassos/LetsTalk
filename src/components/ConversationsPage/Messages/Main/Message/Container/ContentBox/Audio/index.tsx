import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Message } from 'components/ConversationsPage/Messages/Main';
import { useInitializeAudio } from 'hooks/Audio/useInitializeAudio';
import { Avatar } from './Avatar';
import { InteractiveElements } from './InteractiveElements';

type AudioComponentProps = {
  index: number;
  isContact: Message['contactMessage'];
};

export function AudioComponent({ index, isContact }: AudioComponentProps) {
  useInitializeAudio('horse.wav', index);

  return (
    <Flex
      color={useColorModeValue('blue.900', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
      gap='.9em'
    >
      <Avatar isContact={isContact} />
      <InteractiveElements />
    </Flex>
  );
}

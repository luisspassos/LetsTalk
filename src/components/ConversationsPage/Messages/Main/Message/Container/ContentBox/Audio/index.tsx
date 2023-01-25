import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { InteractiveElements } from './InteractiveElements';

export function AudioComponent() {
  const audio = new Audio('horse.wav');
  audio.preload = 'metadata';

  return (
    <Flex
      color={useColorModeValue('blue.900', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
      gap='.9em'
    >
      <Avatar />
      <InteractiveElements audio={audio} />
    </Flex>
  );
}

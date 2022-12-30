import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { PauseButton } from './Buttons/PauseButton';
import { PlayButton } from './Buttons/PlayButton';
import { Duration } from './Duration';

export function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Flex
      color={useColorModeValue('gray.400', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
    >
      <Avatar />
      {isPlaying ? <PauseButton /> : <PlayButton />}
      <Duration />
    </Flex>
  );
}

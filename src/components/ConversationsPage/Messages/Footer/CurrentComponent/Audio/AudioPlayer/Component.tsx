import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useInitializeAudio } from 'hooks/Audio/useInitializeAudio';
import { useMemo } from 'react';
import { CurrentButton } from './CurrentButton';
import { Duration } from './Duration';

export function Component() {
  const { audiosPlaying } = useAudiosPlaying();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const index = useMemo(() => audiosPlaying.length, []);

  useInitializeAudio('horse.wav', index);

  return (
    <Flex
      alignSelf='stretch'
      align='center'
      flex='1'
      bgColor={useColorModeValue('gray.500', 'gray.400')}
      borderRadius='17px'
      boxShadow='base'
      border='1px solid'
      borderColor={useColorModeValue('whiteAlpha.300', 'blackAlpha.600')}
      gap='10px'
      px='10px'
      maxW='17.875rem'
      color='gray.50'
    >
      <CurrentButton />
      <Duration />
    </Flex>
  );
}
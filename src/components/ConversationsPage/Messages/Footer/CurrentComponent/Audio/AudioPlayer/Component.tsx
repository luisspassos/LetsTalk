import { Flex } from '@chakra-ui/react';
import { Button as PlayButton } from 'components/Audio/Buttons/Play';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useInitializeAudio } from 'hooks/Audio/useInitializeAudio';
import { Duration } from './Duration';
import { Slider } from './Slider';

export function Component() {
  const { audiosPlaying } = useAudiosPlaying();
  const index = audiosPlaying.length;

  useInitializeAudio('horse.wav', index);

  return (
    <Flex
      alignSelf='stretch'
      align='center'
      flex='1'
      bgColor='gray.400'
      borderRadius='17px'
      boxShadow='base'
      border='1px solid'
      borderColor='blackAlpha.600'
      gap='10px'
      px='10px'
      maxW='17.875rem'
    >
      <PlayButton fontSize='40px' />
      <Slider />
      <Duration />
    </Flex>
  );
}

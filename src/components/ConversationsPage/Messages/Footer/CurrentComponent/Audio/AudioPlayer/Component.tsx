import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useAudioRecording } from 'contexts/AudioRecordingContext';
import { useInitializeAudio } from 'hooks/Audio/useInitializeAudio';
import { useMemo } from 'react';
import { CurrentButton } from './CurrentButton';
import { Duration } from './Duration';

export type ComponentProps = FlexProps;

export const spacing = '10px';

export function Component(props: ComponentProps) {
  const { audiosPlaying } = useAudiosPlaying();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const index = useMemo(() => audiosPlaying.length, []);

  const { mediaRecorder } = useAudioRecording();

  // useEffect(() => {
  //   mediaRecorder.current?.addEventListener('dataavailable', (e) => {
  //     console.log(e.data);
  //   });
  // }, [mediaRecorder]);

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
      gap={spacing}
      px={spacing}
      maxW='17.875rem'
      color='gray.50'
      {...props}
    >
      <CurrentButton />
      <Duration />
    </Flex>
  );
}

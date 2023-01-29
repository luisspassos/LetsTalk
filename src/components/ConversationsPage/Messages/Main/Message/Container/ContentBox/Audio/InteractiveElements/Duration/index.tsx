import { Flex } from '@chakra-ui/react';
import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useEffect, useState } from 'react';
import { Slider } from './Slider';
import { Texts } from './Texts';

export function Duration() {
  const { audio, iterateAudioEvents } = useAudio();

  const [duration, setDuration] = useState<HTMLAudioElement['duration']>(0);

  useEffect(() => {
    function setAudioDuration() {
      if (audio?.element.duration === undefined) return;

      setDuration(audio.element.duration);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: setAudioDuration,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [audio, iterateAudioEvents]);

  return (
    <Flex
      alignSelf='stretch'
      justify='center'
      align='center'
      flex='1'
      direction='column'
      pos='relative'
    >
      <Slider duration={duration} />
      <Texts duration={duration} />
    </Flex>
  );
}

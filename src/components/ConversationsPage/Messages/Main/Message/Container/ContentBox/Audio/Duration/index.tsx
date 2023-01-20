import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Slider } from './Slider';

import { Event, iterateEvents } from '..';
import { useAudioDuration } from 'contexts/AudioDurationContext';
import { Texts } from './Texts';

type DurationProps = {
  audio: HTMLAudioElement;
};

export function Duration({ audio }: DurationProps) {
  const { setDuration } = useAudioDuration();

  useEffect(() => {
    function setAudioDuration() {
      setDuration(audio.duration);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: setAudioDuration,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio, setDuration]);

  return (
    <Flex
      alignSelf='stretch'
      justify='center'
      flex='1'
      direction='column'
      pos='relative'
    >
      <Slider />
      <Texts audio={audio} />
    </Flex>
  );
}

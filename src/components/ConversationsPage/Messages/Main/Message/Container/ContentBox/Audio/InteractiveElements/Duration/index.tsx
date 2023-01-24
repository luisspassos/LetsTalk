import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { iterateEvents } from 'utils/iterateEvents';
import { Slider } from './Slider';
import { Event } from '..';
import { Texts } from './Texts';

type DurationProps = {
  audio: HTMLAudioElement;
  isPlaying: boolean;
};

export function Duration({ audio, isPlaying }: DurationProps) {
  const [duration, setDuration] = useState<HTMLAudioElement['duration']>(0);

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
  }, [audio]);

  return (
    <Flex
      alignSelf='stretch'
      justify='center'
      flex='1'
      direction='column'
      pos='relative'
    >
      <Slider isPlaying={isPlaying} duration={duration} audio={audio} />
      <Texts duration={duration} audio={audio} />
    </Flex>
  );
}

import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { Texts } from './Texts';

import { Event, iterateEvents } from '..';

type DurationProps = {
  audio: HTMLAudioElement;
};

function formatSecondsAsTime(secs: number) {
  const hr = Math.floor(secs / 3600);
  const min = Math.floor((secs - hr * 3600) / 60);
  let sec: number | string = Math.floor(secs - hr * 3600 - min * 60);

  if (sec < 10) {
    sec = '0' + sec;
  }

  return min + ':' + sec;
}

const initialValue = '0:00';

export function Duration({ audio }: DurationProps) {
  const [duration, setDuration] = useState(initialValue);
  const [currentTime, setCurrentTime] = useState(initialValue);

  useEffect(() => {
    function setAudioDuration() {
      const formattedDuration = formatSecondsAsTime(audio.duration);

      setDuration(formattedDuration);
    }

    function getCurrentTime() {
      const formattedCurrentTime = formatSecondsAsTime(audio.currentTime);

      setCurrentTime(formattedCurrentTime);
    }

    function resetAudio() {
      setCurrentTime(initialValue);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: setAudioDuration,
      },
      {
        type: 'timeupdate',
        func: getCurrentTime,
      },
      {
        type: 'ended',
        func: resetAudio,
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
      <Slider audio={audio} />
      <Texts duration={duration} currentTime={currentTime} />
    </Flex>
  );
}

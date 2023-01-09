import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { Texts } from './Texts';

type DurationProps = {
  audio: HTMLAudioElement;
};

type EventType = keyof HTMLMediaElementEventMap;

type Event = {
  type: EventType;
  func: (
    this: HTMLAudioElement,
    ev: HTMLMediaElementEventMap[EventType]
  ) => any;
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

export function Duration({ audio }: DurationProps) {
  const [duration, setDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');

  useEffect(() => {
    function setAudioDuration() {
      const formattedDuration = formatSecondsAsTime(audio.duration);

      setDuration(formattedDuration);
    }

    function getCurrentTime() {
      const formattedCurrentTime = formatSecondsAsTime(audio.currentTime);

      setCurrentTime(formattedCurrentTime);
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
    ];

    function iterateEvents(method: 'remove' | 'add') {
      for (const { type, func } of events) {
        audio[`${method}EventListener`](type, func);
      }
    }

    iterateEvents('add');

    return () => {
      iterateEvents('remove');
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

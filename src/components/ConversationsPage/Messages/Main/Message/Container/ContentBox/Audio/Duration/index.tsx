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

function formatTime(time: number) {
  const timeInMinutes = time / 60;
  const timeWithTwoDecimalPlaces = timeInMinutes.toFixed(2);

  console.log(time);
  console.log(timeWithTwoDecimalPlaces);

  // const minutes = Math.floor(time / 60);
  // const seconds = time - minutes * 60;

  // const timeInMinutes = Math.floor(time)  ;
  // // const timeWithTwoDecimalPlaces = timeInMinutes.toFixed(2);
  // const timeWithTwoDecimalPlaces = timeInMinutes;
  // const newTime = timeWithTwoDecimalPlaces.replace('.', ':');

  return timeWithTwoDecimalPlaces;
}

export function Duration({ audio }: DurationProps) {
  const [duration, setDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');

  useEffect(() => {
    function setAudioDuration() {
      const formattedDuration = formatTime(audio.duration);

      setDuration(formattedDuration);
    }

    function getCurrentTime() {
      const formattedCurrentTime = formatTime(audio.currentTime);

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
      <Slider />
      <Texts duration={duration} currentTime={currentTime} />
    </Flex>
  );
}

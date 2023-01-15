import { useEffect, useState } from 'react';
import { formatSecondsAsTime, initialValue, Text } from '.';
import { iterateEvents, Event } from '../../..';

type CurrentTimeProps = {
  audio: HTMLAudioElement;
};

export function CurrentTime({ audio }: CurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState(initialValue);

  useEffect(() => {
    function getCurrentTime() {
      const formattedTime = formatSecondsAsTime(audio.currentTime);

      setCurrentTime(formattedTime);
    }

    const events: Event[] = [
      {
        type: 'timeupdate',
        func: getCurrentTime,
      },
    ];

    iterateEvents('add', events, audio);
  }, [audio]);

  return <Text>{currentTime}</Text>;
}

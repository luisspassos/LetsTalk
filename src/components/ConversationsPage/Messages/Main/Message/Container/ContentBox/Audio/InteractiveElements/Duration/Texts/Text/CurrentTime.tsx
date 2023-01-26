import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useEffect, useState } from 'react';
import { formatSecondsAsTime, initialValue, Text } from '.';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(initialValue);

  const { audio, iterateAudioEvents } = useAudio();

  useEffect(() => {
    function getCurrentTime() {
      if (audio === null) return;

      const formattedTime = formatSecondsAsTime(audio.element.currentTime);

      setCurrentTime(formattedTime);
    }

    const events: Event[] = [
      {
        type: 'timeupdate',
        func: getCurrentTime,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [audio, iterateAudioEvents]);

  return <Text>{currentTime}</Text>;
}

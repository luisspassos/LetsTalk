import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useEffect, useState } from 'react';
import { formatSecondsAsTime, initialValue, Text } from '.';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(initialValue);

  const { audio, iterateAudioEvents } = useAudio();
  const { positionInPercentage, isHolding } = useAudioPositionInPercentage();

  useEffect(() => {
    if (audio === null) return;

    const duration = audio.element.duration;

    const newCurrentTime = duration - (positionInPercentage * duration) / 100;
    const formattedNewCurrentTime = formatSecondsAsTime(newCurrentTime);

    setCurrentTime(formattedNewCurrentTime);
  }, [audio, positionInPercentage]);

  // set audio events
  useEffect(() => {
    function getCurrentTime() {
      if (audio === null || isHolding.current === true) return;

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
  }, [audio, isHolding, iterateAudioEvents]);

  return <Text>{currentTime}</Text>;
}

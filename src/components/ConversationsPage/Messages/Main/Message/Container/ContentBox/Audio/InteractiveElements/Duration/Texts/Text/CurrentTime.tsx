import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useEffect, useState } from 'react';
import { formatAudioTime, initialValue } from 'utils/formatAudioTime';
import { Text } from '.';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(initialValue);

  const { audio, iterateAudioEvents } = useAudio();
  const { positionInPercentage, isHolding } = useAudioPositionInPercentage();

  // set current time
  useEffect(() => {
    if (audio === null || isHolding.current === false) return;

    const duration = audio.element.duration;

    const newCurrentTime = duration - (positionInPercentage * duration) / 100;
    const formattedNewCurrentTime = formatAudioTime(newCurrentTime);

    setCurrentTime(formattedNewCurrentTime);
  }, [audio, isHolding, positionInPercentage]);

  // set audio events
  useEffect(() => {
    function getCurrentTime() {
      if (audio === null || isHolding.current === true) return;

      const formattedTime = formatAudioTime(audio.element.currentTime);

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

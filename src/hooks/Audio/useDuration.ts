import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useState, useEffect } from 'react';

export function useDuration() {
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

  return { duration };
}

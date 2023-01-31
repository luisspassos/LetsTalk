import { useAudio, Event } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

type SetTime = Dispatch<SetStateAction<string>>;

export function useCurrentTime(setTime: SetTime) {
  const { audio, iterateAudioEvents } = useAudio();
  const { positionInPercentage, isHolding } = useAudioPositionInPercentage();

  useEffect(() => {
    function setCurrentTimeWhenHolding() {
      if (audio === null || isHolding.current === false) return;

      const duration = audio.element.duration;

      const newCurrentTime = duration - (positionInPercentage * duration) / 100;
      const formattedNewCurrentTime = formatAudioTime(newCurrentTime);

      setTime(formattedNewCurrentTime);
    }

    setCurrentTimeWhenHolding();
  }, [audio, isHolding, positionInPercentage, setTime]);

  // set audio events
  useEffect(() => {
    function getCurrentTime() {
      if (audio === null || isHolding.current === true) return;

      const formattedTime = formatAudioTime(audio.element.currentTime);

      setTime(formattedTime);
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
  }, [audio, isHolding, iterateAudioEvents, setTime]);
}

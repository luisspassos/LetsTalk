import { Time } from 'components/ConversationsPage/Messages/Footer/CurrentComponent/Audio/AudioPlayer/Duration/Text';
import { h, useAudio } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

type SetTime =
  | Dispatch<SetStateAction<string>>
  | Dispatch<SetStateAction<Time>>;

/**
 * A React hook that gets the current time of the audio when it changes or when holding and dragging the slider
 *
 * @param setTime the setState of the current time to update the currentTime.
 * @param audioDuration It's optional. If not provided, the duration will be taken from the audio.element.
 */

export function useCurrentTime(setTime: SetTime, audioDuration?: number) {
  const { audio, iterateAudioEvents } = useAudio();
  const { positionInPercentage, isHolding } = useAudioPositionInPercentage();

  useEffect(() => {
    function setCurrentTimeWhenHolding() {
      if (audio === null || isHolding.current === false) return;

      const duration =
        audioDuration !== undefined ? audioDuration : audio.element.duration;

      const newCurrentTime = duration - (positionInPercentage * duration) / 100;
      const formattedNewCurrentTime = formatAudioTime(newCurrentTime);

      setTime(formattedNewCurrentTime);
    }

    setCurrentTimeWhenHolding();
  }, [audio, audioDuration, isHolding, positionInPercentage, setTime]);

  // set audio events
  useEffect(() => {
    function getCurrentTime() {
      if (audio === null || isHolding.current === true) return;

      const formattedTime = formatAudioTime(audio.element.currentTime);

      setTime(formattedTime);
    }

    const events = [
      h({
        type: 'timeupdate',
        func: getCurrentTime,
      }),
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [audio, isHolding, iterateAudioEvents, setTime]);
}

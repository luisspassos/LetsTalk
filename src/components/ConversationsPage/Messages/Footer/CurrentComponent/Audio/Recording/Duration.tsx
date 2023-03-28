import { Text } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect, useState } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

export function Duration() {
  const { iterateRecorderEvents } = useAudioRecording();

  const [duration, setDuration] = useState(0);
  const formattedDuration = formatAudioTime(duration);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    function increaseDuration() {
      setDuration((prev) => prev + 1);
    }

    interval = setInterval(increaseDuration, 1000 /* 1 second */);

    return () => {
      if (interval === null) return;

      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   let interval: NodeJS.Timer | null = null;

  //   function startDuration() {
  //     function increaseDuration() {
  //       setDuration((prev) => prev + 1);
  //     }

  //     interval = setInterval(increaseDuration, 1000 /* 1 second */);
  //   }

  //   function endDuration() {
  //     if (interval === null) return;

  //     clearInterval(interval);
  //   }

  //   const events: RecorderEvent[] = [
  //     {
  //       type: 'start',
  //       func: startDuration,
  //     },
  //     {
  //       type: 'stop',
  //       func: endDuration,
  //     },
  //     {
  //       type: 'pause',
  //       func: endDuration,
  //     },
  //     {
  //       type: 'resume',
  //       func: startDuration,
  //     },
  //   ];

  //   iterateRecorderEvents('add', events);

  //   return () => {
  //     iterateRecorderEvents('remove', events);
  //   };
  // }, [iterateRecorderEvents]);

  return (
    <Text as='time' flexShrink={0}>
      {formattedDuration}
    </Text>
  );
}

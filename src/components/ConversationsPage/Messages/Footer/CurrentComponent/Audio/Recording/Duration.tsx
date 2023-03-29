import { Text } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

export function Duration() {
  const { setDurations, duration } = useAudioRecording();
  const formattedDuration = formatAudioTime(duration.valueInSeconds);

  console.log(duration.durations.value);

  useEffect(() => {
    const start = Date.now();

    setInterval(() => {
      setDurations([Date.now() - start]);
    }, 1);
  }, [setDurations]);

  // useEffect(() => {
  //   let interval: NodeJS.Timer | null = null;

  //   newDurations.push(0);

  //   const currentIndex = newDurations.length - 1;

  //   const start = Date.now();

  //   function increaseDuration() {
  //     const newMilliseconds = Date.now() - start;

  //     newDurations[currentIndex] = newMilliseconds;

  //     duration.durations.set(newDurations);
  //   }

  //   interval = setInterval(increaseDuration, 1);

  //   return () => {
  //     if (interval === null) return;

  //     clearInterval(interval);
  //   };
  // }, [duration.durations, newDurations]);

  return (
    <Text as='time' flexShrink={0}>
      {formattedDuration}
    </Text>
  );
}

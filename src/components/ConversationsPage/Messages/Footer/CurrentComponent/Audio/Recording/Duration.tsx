import { Text } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

export function Duration() {
  const { duration } = useAudioRecording();
  const formattedDuration = formatAudioTime(duration.valueInSeconds);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    const currentIndex = duration.durations.value.length - 1;

    const start = Date.now();

    function increaseDuration() {
      const newDurations = [...duration.durations.value];

      const newMilliseconds = Date.now() - start;

      newDurations[currentIndex] = newMilliseconds;

      set;
      // if (duration.start.current === null) return;

      // duration.set(Date.now() - duration.start.current);
    }

    interval = setInterval(increaseDuration, 1);

    return () => {
      if (interval === null) return;

      clearInterval(interval);
    };
  }, [duration, duration.start]);

  return (
    <Text as='time' flexShrink={0}>
      {formattedDuration}
    </Text>
  );
}

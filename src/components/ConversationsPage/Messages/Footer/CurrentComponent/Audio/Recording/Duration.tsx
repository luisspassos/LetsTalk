import { Text } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

export function Duration() {
  const { duration } = useAudioRecording();
  const formattedDuration = formatAudioTime(duration.valueInSeconds);

  useEffect(() => {
    function setStart() {
      const start = Date.now();
      duration.start.current = start;
    }

    if (duration.start.current === null) {
      setStart();
    }

    let interval: NodeJS.Timer | null = null;

    function increaseDuration() {
      if (duration.start.current === null) return;

      duration.set(Date.now() - duration.start.current);
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

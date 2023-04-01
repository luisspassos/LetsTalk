import { Text } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect, useMemo } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

export function Duration() {
  const { durationInSeconds, durations, setDurations } = useAudioRecording();
  const formattedDuration = formatAudioTime(durationInSeconds);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newDurations = useMemo(() => durations, []);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    newDurations.push(0);

    const currentIndex = newDurations.length - 1;

    const start = Date.now();

    function increaseDuration() {
      const newMilliseconds = Date.now() - start;

      newDurations[currentIndex] = newMilliseconds;

      setDurations([...newDurations]);
    }

    interval = setInterval(increaseDuration, 1);

    return () => {
      if (interval === null) return;

      clearInterval(interval);
    };
  }, [newDurations, setDurations]);

  return (
    <Text as='time' flexShrink={0} w='40px' textAlign='center'>
      {formattedDuration}
    </Text>
  );
}

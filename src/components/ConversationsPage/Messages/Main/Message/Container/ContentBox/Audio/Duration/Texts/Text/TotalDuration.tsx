import { useAudioDuration } from 'contexts/AudioDurationContext';
import { useEffect, useRef } from 'react';
import { formatSecondsAsTime, initialValue, Text } from '.';

export function TotalDuration() {
  const { duration } = useAudioDuration();
  const { formattedDuration } = useRef(initialValue);

  useEffect(() => {
    formattedDuration.current = formatSecondsAsTime(duration);
  }, [duration, formattedDuration]);

  return <Text>{formattedDuration.current}</Text>;
}

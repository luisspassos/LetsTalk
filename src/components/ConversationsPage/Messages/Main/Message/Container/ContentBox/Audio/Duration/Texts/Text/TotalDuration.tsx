import { useEffect, useRef } from 'react';
import { formatSecondsAsTime, initialValue, Text } from '.';

type TotalDurationProps = {
  duration: HTMLAudioElement['duration'];
};

export function TotalDuration({ duration }: TotalDurationProps) {
  const formattedDuration = useRef(initialValue);

  useEffect(() => {
    formattedDuration.current = formatSecondsAsTime(duration);
  }, [duration, formattedDuration]);

  return <Text>{formattedDuration.current}</Text>;
}

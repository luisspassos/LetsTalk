import { useEffect, useRef } from 'react';
import { formatAudioTime, initialValue } from 'utils/formatAudioTime';
import { Text } from '.';

type TotalDurationProps = {
  duration: HTMLAudioElement['duration'];
};

export function TotalDuration({ duration }: TotalDurationProps) {
  const formattedDuration = useRef(initialValue);

  useEffect(() => {
    formattedDuration.current = formatAudioTime(duration);
  }, [duration, formattedDuration]);

  return <Text>{formattedDuration.current}</Text>;
}

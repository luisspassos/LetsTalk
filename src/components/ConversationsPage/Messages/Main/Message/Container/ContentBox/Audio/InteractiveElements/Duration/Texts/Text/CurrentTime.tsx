import { useCurrentTime } from 'hooks/Audio/useCurrentTime';
import { useState } from 'react';
import { initialValue } from 'utils/formatAudioTime';
import { Text } from '.';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(initialValue);

  useCurrentTime(setCurrentTime);

  return <Text>{currentTime}</Text>;
}

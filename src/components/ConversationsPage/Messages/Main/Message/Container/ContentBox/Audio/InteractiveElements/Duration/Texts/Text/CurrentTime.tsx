import { useCurrentTime } from 'hooks/Audio/useCurrentTime';
import { useState } from 'react';
import { initialValue } from 'utils/formatAudioTime';
import { styles } from '.';
import { CurrentTime as CurrentTimeComponent } from 'components/Audio/Duration/CurrentTime';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(initialValue);

  useCurrentTime(setCurrentTime);

  return <CurrentTimeComponent {...styles}>{currentTime}</CurrentTimeComponent>;
}

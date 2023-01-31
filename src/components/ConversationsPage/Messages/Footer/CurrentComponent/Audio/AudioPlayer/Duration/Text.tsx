import { Text as ChakraText } from '@chakra-ui/react';
import { useCurrentTime } from 'hooks/Audio/useCurrentTime';
import { useEffect, useState } from 'react';
import { formatAudioTime, initialValue } from 'utils/formatAudioTime';

type Props = {
  duration: HTMLAudioElement['duration'];
};

export function Text({ duration }: Props) {
  const [time, setTime] = useState(initialValue);

  useEffect(() => {
    const formattedDuration = formatAudioTime(duration);

    setTime(formattedDuration);
  }, [duration]);

  useCurrentTime(setTime);

  return (
    <ChakraText
      as='time'
      w='2rem'
      textAlign='center'
      fontSize='0.9375rem'
      flexShrink={0}
    >
      {time}
    </ChakraText>
  );
}

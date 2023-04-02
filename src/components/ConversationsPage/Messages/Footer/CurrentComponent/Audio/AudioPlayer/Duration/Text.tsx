import {
  Center,
  ChakraProps,
  Spinner,
  Text as ChakraText,
} from '@chakra-ui/react';
import { useCurrentTime } from 'hooks/Audio/useCurrentTime';
import { useEffect, useState } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

type Props = {
  duration: HTMLAudioElement['duration'];
};

export type Time = string | null;

const styles: ChakraProps = {
  minW: '2rem',
  flexShrink: 0,
};

export function Text({ duration }: Props) {
  const [time, setTime] = useState<Time>(null);

  useEffect(() => {
    const formattedDuration = formatAudioTime(duration);

    setTime(formattedDuration);
  }, [duration]);

  useCurrentTime(setTime, duration);

  if (time === null)
    return (
      <Center {...styles}>
        <Spinner size='sm' />
      </Center>
    );

  return (
    <ChakraText
      lineHeight='1'
      as='time'
      textAlign='center'
      fontSize='0.9375rem'
      {...styles}
    >
      10:00:00
    </ChakraText>
  );
}

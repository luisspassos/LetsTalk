import { Center, ChakraProps, Spinner } from '@chakra-ui/react';
import { CurrentTime } from 'components/Audio/Duration/CurrentTime';
import { useCurrentTime } from 'hooks/Audio/useCurrentTime';
import { useEffect, useState } from 'react';
import { formatAudioTime } from 'utils/formatAudioTime';

type Props = {
  duration: HTMLAudioElement['duration'];
};

export type Time = string | null;

const styles: ChakraProps = {
  minW: '2.8125rem',
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
    <CurrentTime
      lineHeight='1'
      textAlign='center'
      fontSize='0.9375rem'
      {...styles}
    >
      {time}
    </CurrentTime>
  );
}

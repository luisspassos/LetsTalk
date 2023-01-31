import { Text as ChakraText } from '@chakra-ui/react';
import { formatAudioTime } from 'utils/formatAudioTime';

type Props = {
  duration: HTMLAudioElement['duration'];
};

export function Text({ duration }: Props) {
  return (
    <ChakraText as='time' fontSize='0.9375rem' flexShrink={0}>
      {formatAudioTime(duration)}
    </ChakraText>
  );
}

import { Flex } from '@chakra-ui/react';
import { CurrentTime } from './Text/CurrentTime';
import { TotalDuration } from './Text/TotalDuration';

type TextsProps = {
  duration: HTMLAudioElement['duration'];
};

export function Texts({ duration }: TextsProps) {
  return (
    <Flex
      left={0}
      right={0}
      bottom='-.5em'
      pos='absolute'
      justify='space-between'
    >
      <CurrentTime />
      <TotalDuration duration={duration} />
    </Flex>
  );
}

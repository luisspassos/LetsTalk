import { Flex } from '@chakra-ui/react';
import { CurrentTime } from './Text/CurrentTime';
import { TotalDuration } from './Text/TotalDuration';

type TextsProps = {
  audio: HTMLAudioElement;
  duration: HTMLAudioElement['duration'];
};

export function Texts({ audio, duration }: TextsProps) {
  return (
    <Flex
      left={0}
      right={0}
      bottom='-.5em'
      pos='absolute'
      justify='space-between'
    >
      <CurrentTime audio={audio} />
      <TotalDuration duration={duration} />
    </Flex>
  );
}

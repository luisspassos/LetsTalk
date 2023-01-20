import { Flex } from '@chakra-ui/react';
import { Duration } from '..';
import { CurrentTime } from './Text/CurrentTime';

type TextsProps = {
  audio: HTMLAudioElement;
};

export function Texts({ audio }: TextsProps) {
  return (
    <Flex
      left={0}
      right={0}
      bottom='-.5em'
      pos='absolute'
      justify='space-between'
    >
      <CurrentTime audio={audio} />
      <Duration audio={audio} />
    </Flex>
  );
}

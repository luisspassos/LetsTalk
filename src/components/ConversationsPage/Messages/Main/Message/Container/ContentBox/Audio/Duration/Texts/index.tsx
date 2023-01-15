import { Flex } from '@chakra-ui/react';
import { Text } from './Text';

type Texts = {
  currentTime: string;
  duration: string;
};

export function formatSecondsAsTime(secs: number) {
  const hr = Math.floor(secs / 3600);
  const min = Math.floor((secs - hr * 3600) / 60);
  let sec: number | string = Math.floor(secs - hr * 3600 - min * 60);

  if (sec < 10) {
    sec = '0' + sec;
  }

  return min + ':' + sec;
}

export function Texts({ currentTime, duration }: Texts) {
  return (
    <Flex
      left={0}
      right={0}
      bottom='-.5em'
      pos='absolute'
      justify='space-between'
    >
      <Text>{currentTime}</Text>
      <Text>{duration}</Text>
    </Flex>
  );
}

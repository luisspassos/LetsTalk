import { Flex } from '@chakra-ui/react';
import { Text } from './Text';

type Texts = {
  currentTime: string;
  duration: string;
};

export function Texts({ currentTime, duration }: Texts) {
  return (
    <Flex
      left={0}
      right={0}
      bottom='-7px'
      pos='absolute'
      justify='space-between'
    >
      <Text>{currentTime}</Text>
      <Text>{duration}</Text>
    </Flex>
  );
}

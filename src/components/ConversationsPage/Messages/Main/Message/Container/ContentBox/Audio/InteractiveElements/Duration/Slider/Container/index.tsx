import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Track } from './Track';

export type ContainerProps = {
  percentage: number;
  stopAnimation: boolean;
  duration: HTMLAudioElement['duration'];
  audio: HTMLAudioElement;
  isPlaying: boolean;
};

export function Container(props: ContainerProps) {
  return (
    <Flex
      h='5px'
      bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
      overflow='hidden'
      borderRadius='20px'
    >
      <Track {...props} />
      {/* <Thumb {...props} /> */}
    </Flex>
  );
}

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Thumb } from './Thumb';
import { Track } from './Track';

export type ContainerProps = {
  stopAnimation: boolean;
  duration: HTMLAudioElement['duration'];
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
      <Thumb {...props} />
    </Flex>
  );
}

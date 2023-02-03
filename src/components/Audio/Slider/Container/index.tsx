import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Thumb } from './Thumb';
import { Track } from './Track';

export type ContainerProps = {
  resetAnimation: boolean;
  duration: HTMLAudioElement['duration'];
};

export function Container(props: ContainerProps) {
  return (
    <Flex
      flex='1'
      h='33%'
      bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
      overflow='hidden'
      align='center'
      borderRadius='20px'
    >
      <Track {...props} />
      <Thumb {...props} />
    </Flex>
  );
}

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Thumb } from './Thumb';
import { Track } from './Track';

export function Container() {
  return (
    <Flex
      h='5px'
      bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
      overflow='hidden'
      borderRadius='20px'
    >
      <Track />
      <Thumb />
    </Flex>
  );
}

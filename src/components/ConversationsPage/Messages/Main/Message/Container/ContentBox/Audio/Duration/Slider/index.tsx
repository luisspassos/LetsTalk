import { Box, Flex } from '@chakra-ui/react';
import { Container } from './Container';
import { thumbSize } from './Container/Thumb/Circle';

export function Slider() {
  return (
    <Flex align='center' justify='center' h={thumbSize} cursor='pointer'>
      <Box w={`calc(100% - ${thumbSize})`} pos='relative'>
        <Container />
      </Box>
    </Flex>
  );
}

import { Box } from '@chakra-ui/react';

export const thumbSize = '15px';

export function Circle() {
  return (
    <Box
      w={thumbSize}
      h={thumbSize}
      bg='current'
      borderRadius='50%'
      pos='absolute'
      right='0'
      cursor='pointer'
      transform='translateX(50%)'
    />
  );
}

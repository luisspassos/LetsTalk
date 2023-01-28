import { Box } from '@chakra-ui/react';

export function Circle() {
  return (
    <Box
      h='100%'
      bg='current'
      borderRadius='50%'
      pos='absolute'
      right='0'
      cursor='pointer'
      transform='translateX(50%)'
      pointerEvents='none'
      sx={{
        '&': {
          aspectRatio: '1 / 1',
        },
      }}
    />
  );
}

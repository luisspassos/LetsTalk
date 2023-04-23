import { Box } from '@chakra-ui/react';

export function Circle() {
  return (
    <Box
      role='slider'
      aria-orientation='horizontal'
      aria-label='Controle de progresso do áudio'
      h='100%'
      tabIndex={0}
      bg='current'
      borderRadius='50%'
      pos='absolute'
      right='0'
      cursor='pointer'
      transform='translateX(50%)'
      pointerEvents='none'
      outline={0}
      sx={{
        '&': {
          aspectRatio: '1 / 1',
        },
      }}
      _focusVisible={{
        boxShadow: 'outline',
      }}
    />
  );
}

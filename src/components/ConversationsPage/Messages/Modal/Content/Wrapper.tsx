import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Box
      sx={{
        '&, & *': {
          borderRadius: '5px',
        },
      }}
      mr='auto'
      bg='gray.400'
      p='5px'
      boxShadow='lg'
    >
      {children}
    </Box>
  );
}

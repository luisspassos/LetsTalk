import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Box
      p='5px'
      sx={{
        '*': {
          maxH: '400px',
        },
      }}
    >
      {children}
    </Box>
  );
}

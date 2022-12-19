import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
} & BoxProps;

export function Wrapper({ children, maxH, ...rest }: WrapperProps) {
  return (
    <Box
      sx={{
        '&, & *': {
          borderRadius: '5px',
        },
        '& > *': {
          maxH,
        },
      }}
      mr='auto'
      bg='gray.400'
      p='5px'
      boxShadow='lg'
      {...rest}
    >
      {children}
    </Box>
  );
}

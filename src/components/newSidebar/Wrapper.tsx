import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  boxProps: BoxProps;
  flexProps: FlexProps;
};

export function Wrapper({ boxProps, children, flexProps }: WrapperProps) {
  return (
    <Box as='nav' {...boxProps}>
      <Flex
        justify='space-between'
        align='center'
        w='100%'
        h='100%'
        {...flexProps}
      >
        {children}
      </Flex>
    </Box>
  );
}

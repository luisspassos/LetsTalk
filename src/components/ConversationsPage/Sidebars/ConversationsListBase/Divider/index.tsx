import { Divider, DividerProps, useColorModeValue } from '@chakra-ui/react';

export type BaseProps = DividerProps;

export function Base(props: BaseProps) {
  return (
    <Divider
      borderColor={useColorModeValue('blue.900', 'whiteAlpha.800')}
      {...props}
    />
  );
}

import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from '@chakra-ui/react';

type DividerProps = ChakraDividerProps;

export function Divider({ ...props }: DividerProps) {
  return (
    <ChakraDivider
      borderColor='blue.900'
      opacity='15%'
      borderBottomWidth='2px'
      mt='10px'
      mb='18px'
      {...props}
    />
  );
}

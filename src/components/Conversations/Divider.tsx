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
      mt={['6px', '8px', '10px']}
      mb={['14px', '16px', '18px']}
      {...props}
    />
  );
}

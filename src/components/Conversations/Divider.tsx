import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
  useColorModeValue,
} from '@chakra-ui/react';

type DividerProps = ChakraDividerProps;

export function Divider({ ...props }: DividerProps) {
  return (
    <ChakraDivider
      borderColor={useColorModeValue('blue.900', 'whiteAlpha.800')}
      opacity='15%'
      borderBottomWidth='2px'
      mt={['6px', '8px', '10px']}
      mb={['14px', '16px', '18px']}
      {...props}
    />
  );
}

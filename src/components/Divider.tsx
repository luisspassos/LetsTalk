import { Divider as ChakraDivider, useColorModeValue } from '@chakra-ui/react';

export function Divider() {
  return (
    <ChakraDivider
      borderColor={useColorModeValue('blueAlpha.900', 'whiteAlpha.800')}
    />
  );
}

import { Box } from '@chakra-ui/react';

export function Triangle() {
  return (
    <Box
      borderBottomRightRadius='4px'
      borderStyle='solid'
      borderWidth={['14px', '17px', '20px']}
      borderColor='transparent'
      borderBottomColor='gray.400'
      ml='-20px'
    />
  );
}

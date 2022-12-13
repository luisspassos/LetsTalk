import { Text, useColorModeValue } from '@chakra-ui/react';

export function WarningText() {
  return (
    <Text
      mt='10px'
      fontSize={['14px', '14.5px', '15px']}
      as='small'
      color={useColorModeValue('red.600', 'gray.200')}
    >
      *Esta ação é irreversível
    </Text>
  );
}

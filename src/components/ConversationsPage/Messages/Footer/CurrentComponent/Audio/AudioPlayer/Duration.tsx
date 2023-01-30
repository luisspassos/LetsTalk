import { Text } from '@chakra-ui/react';

export function Duration() {
  return (
    <Text as='time' fontSize='0.9375rem' flexShrink={0}>
      3:48
    </Text>
  );
}

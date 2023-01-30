import { Text } from '@chakra-ui/react';

export function Duration() {
  return (
    <Text as='time' fontSize='15px' flexShrink={0}>
      3:48
    </Text>
  );
}

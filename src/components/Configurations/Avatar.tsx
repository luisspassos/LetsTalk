import { Flex, Avatar as ChakraAvatar, Stack, Text } from '@chakra-ui/react';

export function Avatar() {
  return (
    <Flex>
      <ChakraAvatar src='https://github.com/luisspassos' />
      <Stack spacing={0}>
        <Text as='strong'>luis</Text>
        <Text as='small'>#9837</Text>
      </Stack>
    </Flex>
  );
}

import { Flex } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { Username } from './Username';

export function User() {
  return (
    <Flex display='flex' align='center' my='.75em' gap='.5em'>
      <Avatar />
      <Username />
    </Flex>
  );
}

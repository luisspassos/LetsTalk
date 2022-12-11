import { Flex } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { Username } from './Username';

export function User() {
  return (
    <Flex
      display='flex'
      align='center'
      my={['11px', '13px', '15px']}
      gap='10px'
    >
      <Avatar />
      <Username />
    </Flex>
  );
}

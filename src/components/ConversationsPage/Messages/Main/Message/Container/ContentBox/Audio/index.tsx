import { Flex } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Duration } from './Duration';

export function Audio() {
  return (
    <Flex align='center' p='10px'>
      <Avatar />
      <Button />
      <Duration />
    </Flex>
  );
}

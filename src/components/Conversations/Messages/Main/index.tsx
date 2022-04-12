import { Stack } from '@chakra-ui/react';
import { Message } from './Message';

export function Main() {
  return (
    <Stack
      overflow='auto'
      as='main'
      py='20px'
      pr='20px'
      mr='-20px'
      spacing='10px'
    >
      <Message />
      <Message isYourMessage />
      <Message isYourMessage />
    </Stack>
  );
}

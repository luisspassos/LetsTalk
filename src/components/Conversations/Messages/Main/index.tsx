import { Stack } from '@chakra-ui/react';
import { Message } from './Message';

export function Main() {
  return (
    <Stack
      overflow='auto'
      as='main'
      py={['14px', '17px', '20px']}
      pr={['14px', '17px', '20px']}
      mr={['-14px', '-17px', '-20px']}
      spacing={['6px', '8px', '10px']}
    >
      <Message />
      <Message isYourMessage />
      <Message isYourMessage />
    </Stack>
  );
}

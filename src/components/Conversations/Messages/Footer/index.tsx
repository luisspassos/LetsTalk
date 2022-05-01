import { Box, Flex } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { MessageInput } from './MessageInput';
import { RecordButtonAudio } from './RecordButtonAudio';

export function Footer() {
  return (
    <Box mt='auto'>
      <Divider />
      <Flex
        as='footer'
        py={['11px', '13px', '15px']}
        minH={['50px', '65px', '80px']}
        align='center'
        justify='start'
        pl={['6px', '8px', '10px']}
      >
        <MessageInput />
        <RecordButtonAudio />
      </Flex>
    </Box>
  );
}

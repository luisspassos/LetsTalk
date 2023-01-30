import { Box, Flex } from '@chakra-ui/react';
import { Divider } from 'components/Divider';
import { CurrentComponent } from './CurrentComponent';
import { EmojiPicker } from './EmojiPicker';

export function Footer() {
  return (
    <Box display='inline-block' as='footer'>
      <Box mt='auto'>
        <EmojiPicker />
        <Divider />
        <Flex py='15px' align='end' justify='start' pos='relative'>
          <CurrentComponent />
        </Flex>
      </Box>
    </Box>
  );
}

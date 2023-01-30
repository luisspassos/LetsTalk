import { Box, Flex } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { Form } from './Form';
import { IconButtons } from './LeftButtons';
import { EmojiPicker } from './LeftButtons/EmojiButton/EmojiPicker';

export function Footer() {
  return (
    <Box display='inline-block' as='footer'>
      <Box mt='auto'>
        <EmojiPicker />
        <Divider />
        <Flex py='15px' align='end' justify='start' pos='relative'>
          <IconButtons />
          <Form />
        </Flex>
      </Box>
    </Box>
  );
}

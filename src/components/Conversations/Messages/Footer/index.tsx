import { Box, Flex } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { EmojiPicker } from './IconButtons/EmojiButton/EmojiPicker';
import { Form } from './Form';
import { IconButtons } from './IconButtons';

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

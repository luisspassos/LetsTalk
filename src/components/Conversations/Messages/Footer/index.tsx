import { Box, Flex, HStack } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { EmojiPicker } from './IconButtons/EmojiButton/EmojiPicker';
import { EmojiButton } from './IconButtons/EmojiButton';
import { ButtonWrapper } from './ButtonWrapper';
import { Form } from './Form';
import { MediaUploadButton } from './IconButtons/MediaUploadButton';

export function Footer() {
  return (
    <Box display='inline-block' as='footer'>
      <Box mt='auto'>
        <EmojiPicker />
        <Divider />
        <Flex py='15px' align='end' justify='start' pos='relative'>
          <ButtonWrapper>
            <HStack mr='10px' spacing='5px'>
              <EmojiButton />
              <MediaUploadButton />
            </HStack>
          </ButtonWrapper>
          <Form />
        </Flex>
      </Box>
    </Box>
  );
}

import { HStack } from '@chakra-ui/react';
import { EmojiButton } from './EmojiButton';
import { MediaUploadButton } from './MediaUploadButton';
import { Wrapper } from './Wrapper';

export function IconButtons() {
  return (
    <Wrapper>
      <HStack mr='10px' spacing='5px'>
        <EmojiButton />
        <MediaUploadButton />
      </HStack>
    </Wrapper>
  );
}

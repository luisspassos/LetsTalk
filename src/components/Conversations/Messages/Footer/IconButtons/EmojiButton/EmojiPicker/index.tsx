import { Collapse, Flex as ChakraFlex } from '@chakra-ui/react';
import { useToggleEmojiPicker } from '../../../../../../../contexts/EmojiPicker/ToggleEmojiPickerContext';
import { Scroll } from './Scroll';

export function EmojiPicker() {
  const { isOpen } = useToggleEmojiPicker();

  return (
    <Collapse in={isOpen} unmountOnExit>
      <ChakraFlex h='300px' w='100%' direction='column'>
        <Scroll />
      </ChakraFlex>
    </Collapse>
  );
}

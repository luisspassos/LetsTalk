import { Collapse, Flex as ChakraFlex } from '@chakra-ui/react';
import { useToggleEmojiPicker } from '../../../../../../../contexts/EmojiPicker/ToggleEmojiPickerContext';
import { Divider } from '../../../../../../Divider';
import { Categories } from './Categories';
import { Scroll } from './Scroll';

export function EmojiPicker() {
  const { isOpen } = useToggleEmojiPicker();

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Divider />
      <Categories />
      <ChakraFlex h='300px' w='100%' direction='column'>
        <Scroll />
      </ChakraFlex>
    </Collapse>
  );
}

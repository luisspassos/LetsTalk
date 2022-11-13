import { Collapse, Flex as ChakraFlex } from '@chakra-ui/react';
import { useEmojiPicker } from '../../../../../../../contexts/EmojiPickerContext';
import { Divider } from '../../../../../../Divider';
import { Categories } from './Categories';
import { Scroll } from './Scroll';

export function EmojiPicker() {
  const {
    togglePicker: { isOpen },
  } = useEmojiPicker();

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

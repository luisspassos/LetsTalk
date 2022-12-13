import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useToggleEmojiPicker } from '../../../../../../contexts/EmojiPicker/ToggleEmojiPickerContext';
import { IconButton } from '../IconButton';

export function EmojiButton() {
  const { isOpen, onToggle } = useToggleEmojiPicker();

  return (
    <IconButton
      onClick={onToggle}
      aria-label={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

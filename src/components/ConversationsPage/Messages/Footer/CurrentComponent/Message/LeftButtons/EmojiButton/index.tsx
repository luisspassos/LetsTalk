import { useToggleEmojiPicker } from 'contexts/EmojiPicker/ToggleEmojiPickerContext';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { IconButton } from '../IconButton';

export function EmojiButton() {
  const { isOpen, onToggle } = useToggleEmojiPicker();

  console.log(useToggleEmojiPicker());

  return (
    <IconButton
      onClick={onToggle}
      aria-label={isOpen ? 'Fechar emojis' : 'Abrir emojis'}
      label={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
      data-testid='toggle emoji picker'
    />
  );
}

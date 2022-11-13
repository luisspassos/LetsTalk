import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from '../';
import { useToggleEmojiPicker } from '../../../../../../contexts/EmojiPicker/ToggleEmojiPickerContext';

export function EmojiButton() {
  const { isOpen, onToggle } = useToggleEmojiPicker();

  return (
    <InputIconButton
      onClick={onToggle}
      ariaLabel={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from '../';
import { useEmojiPicker } from '../../../../../../contexts/EmojiPickerContext';

export function EmojiButton() {
  const {
    togglePicker: { isOpen, onToggle },
  } = useEmojiPicker();

  return (
    <InputIconButton
      onClick={onToggle}
      ariaLabel={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

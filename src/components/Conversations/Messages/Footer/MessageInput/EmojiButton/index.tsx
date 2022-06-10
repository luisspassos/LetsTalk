import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useToggleEmojiPicker } from '../../../../../../contexts/ToggleEmojiPickerContext';
import { InputIconButton } from '../InputIconButton';

export function EmojiButton() {
  const { onToggle, isOpen } = useToggleEmojiPicker();

  return (
    <InputIconButton
      onClick={onToggle}
      ariaLabel={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

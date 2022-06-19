import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useEmoji } from '../../../../../../contexts/EmojiContext';
import { InputIconButton } from '../InputIconButton';

export function EmojiButton() {
  const {
    togglePicker: { isOpen, onToggle },
  } = useEmoji();

  return (
    <InputIconButton
      onClick={onToggle}
      ariaLabel={isOpen ? 'Fechar emojis' : 'Emojis'}
      Icon={isOpen ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

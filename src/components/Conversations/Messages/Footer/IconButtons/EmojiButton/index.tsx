import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from '../';

export function EmojiButton() {
  // const {
  //   togglePicker: { isOpen, onToggle },
  // } = useEmoji();

  return <InputIconButton ariaLabel={'Emojis'} Icon={MdOutlineEmojiEmotions} />;
}

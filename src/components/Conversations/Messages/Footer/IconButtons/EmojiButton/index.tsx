import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from '../';

export function EmojiButton() {
  return (
    <InputIconButton
      onClick={() => {}}
      ariaLabel={true ? 'Fechar emojis' : 'Emojis'}
      Icon={true ? IoMdClose : MdOutlineEmojiEmotions}
    />
  );
}

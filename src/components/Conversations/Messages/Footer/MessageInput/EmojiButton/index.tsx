import { useCallback } from 'react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from '../InputIconButton';
import { EmojiPicker } from './EmojiPicker';

export function EmojiButton() {
  const handleToggleEmojiPicker = useCallback(() => {}, []);

  return (
    <>
      <InputIconButton
        onClick={handleToggleEmojiPicker}
        ariaLabel='Emojis'
        Icon={MdOutlineEmojiEmotions}
      />
      <EmojiPicker />
    </>
  );
}

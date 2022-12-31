import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { font } from '../../../../../Footer/MessageInput';
import getEmojiRegex from 'emoji-regex';

type TextComponentProps = {
  children: ReactNode;
};

export function TextComponent({ children }: TextComponentProps) {
  function getFontSize() {
    const text = children?.toString();

    const emojiRegex = getEmojiRegex();

    const emojis = text?.match(emojiRegex);

    const textWithoutEmoji = text?.replaceAll(emojiRegex, '');

    const isOneEmoji = emojis?.length === 1 && textWithoutEmoji === '';

    const fontSize = isOneEmoji
      ? ['31px', '33px', '35px']
      : ['14px', '15px', '16px'];

    return fontSize;
  }

  const fontSize = getFontSize();

  return (
    <Text
      fontFamily={font}
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      fontSize={fontSize}
    >
      {children}
    </Text>
  );
}

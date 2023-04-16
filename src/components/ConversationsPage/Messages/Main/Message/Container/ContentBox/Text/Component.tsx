import { Box, Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import getEmojiRegex from 'emoji-regex';
import { fontFamily } from 'components/ConversationsPage/Messages/Footer/CurrentComponent/Message/Form/MessageInput';

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
    <Box
      bgColor='inherit'
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
    >
      <Text
        fontFamily={fontFamily}
        fontSize={fontSize}
        noOfLines={18}
        bgColor='inherit'
      >
        {children}
      </Text>
      <Button variant='unstyled' fontWeight='normal' color='blue.100'>
        Read more
      </Button>
    </Box>
  );
}

import { Box, Text } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import getEmojiRegex from 'emoji-regex';
import { fontFamily } from 'components/ConversationsPage/Messages/Footer/CurrentComponent/Message/Form/MessageInput';
import { ReadMoreButton } from './ReadMoreButton';

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

  const ref = useRef<HTMLParagraphElement>(null);

  const [noOfLines, setNoOfLines] = useState(18);
  const [readMore, setReadMore] = useState(false);

  const showReadMoreButton = useCallback(() => {
    const text = ref.current;

    if (text === null) return;

    const thereIsMoreTextToRead = text.scrollHeight > text.clientHeight;

    if (thereIsMoreTextToRead === false) {
      setReadMore(false);
    } else {
      setReadMore(true);
    }
  }, []);

  useEffect(showReadMoreButton, [showReadMoreButton, noOfLines]);

  return (
    <Box
      fontSize={fontSize}
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
    >
      <Text fontFamily={fontFamily} noOfLines={noOfLines} ref={ref}>
        {children}
      </Text>
      {readMore && <ReadMoreButton setNoOfLines={setNoOfLines} />}
    </Box>
  );
}

import { Text } from '@chakra-ui/react';

type EmojiProps = {
  emoji: string;
};

export function Emoji({ emoji }: EmojiProps) {
  return (
    <Text
      as='span'
      d='flex'
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      fontSize='32px'
      w='46px'
      h='46px'
    >
      {emoji}
    </Text>
  );
}

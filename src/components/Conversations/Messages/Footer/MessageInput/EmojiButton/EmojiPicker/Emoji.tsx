import { Box, Center } from '@chakra-ui/react';
import Twemoji from 'react-twemoji';

type EmojiProps = {
  emoji: string;
};

export function Emoji({ emoji }: EmojiProps) {
  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <Center as='li' w='46px' h='46px'>
        <Box cursor='pointer' w='36px' h='36px'>
          {emoji}
        </Box>
      </Center>
    </Twemoji>
  );
}

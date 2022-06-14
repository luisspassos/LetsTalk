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
          {emoji === '👁️‍🗨️' ? (
            <img
              draggable={false}
              alt='👁️‍🗨️'
              src='https://raw.githubusercontent.com/twitter/twemoji/ad3d3d669bb3697946577247ebb15818f09c6c91/assets/svg/1f441-200d-1f5e8.svg'
            />
          ) : (
            emoji
          )}
        </Box>
      </Center>
    </Twemoji>
  );
}

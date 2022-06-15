import { Center, Image } from '@chakra-ui/react';
import { parse } from 'twemoji-parser';

type EmojiProps = {
  emoji: string;
};

export function Emoji({ emoji }: EmojiProps) {
  const twemoji =
    emoji === '👁️‍🗨️'
      ? 'https://raw.githubusercontent.com/twitter/twemoji/ad3d3d669bb3697946577247ebb15818f09c6c91/assets/svg/1f441-200d-1f5e8.svg'
      : parse(emoji)[0].url;

  return (
    <Center as='li' w={['36px', '41px', '46px']} h={['36px', '41px', '46px']}>
      <Image
        cursor='pointer'
        w={['26px', '31px', '36px']}
        h={['26px', '31px', '36px']}
        src={twemoji}
        alt={emoji}
      />
    </Center>
  );
}

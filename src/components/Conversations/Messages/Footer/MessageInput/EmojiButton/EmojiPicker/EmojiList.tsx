import { Flex, FlexProps } from '@chakra-ui/react';
import { EmojiType } from '../../../../../../../types';
import { Emoji } from './Emoji';

type EmojiListProps = {
  list: EmojiType[];
} & FlexProps;

export function EmojiList({ list, ...rest }: EmojiListProps) {
  return (
    <Flex as='ul' wrap='wrap' {...rest}>
      {list.map((emoji) => (
        <Emoji emoji={emoji.emoji} key={emoji.emoji} />
      ))}
    </Flex>
  );
}

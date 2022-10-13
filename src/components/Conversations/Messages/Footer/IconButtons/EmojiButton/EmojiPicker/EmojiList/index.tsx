import { FlexProps, Flex } from '@chakra-ui/react';
import { EmojiType } from '../../../../../../../../utils/types';
import { Emoji } from './Emoji';

type EmojiListProps = {
  list: EmojiType[];
} & FlexProps;

export function EmojiList({ list, ...rest }: EmojiListProps) {
  return (
    <Flex paddingLeft='10px' wrap='wrap' as='ul' {...rest}>
      {list.map((emoji) => (
        <Emoji name={emoji.name} emoji={emoji.emoji} key={emoji.emoji} />
      ))}
    </Flex>
  );
}
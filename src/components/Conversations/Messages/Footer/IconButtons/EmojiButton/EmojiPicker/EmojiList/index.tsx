import { FlexProps, Flex } from '@chakra-ui/react';
import { Emoji } from './Emoji';
import { Emoji as EmojiType } from '../../../../../../../../contexts/EmojiContext';

type EmojiListProps = {
  list: EmojiType[];
} & FlexProps;

export function EmojiList({ list, ...rest }: EmojiListProps) {
  return (
    <Flex paddingLeft='10px' wrap='wrap' as='ul' {...rest}>
      {list.map((emoji) => (
        <Emoji emoji={emoji} key={emoji} />
      ))}
    </Flex>
  );
}

import { FlexProps, Grid } from '@chakra-ui/react';
import { EmojiType } from '../../../../../../../../types';
import { Emoji } from './Emoji';

type EmojiListProps = {
  list: EmojiType[];
} & FlexProps;

export function EmojiList({ list, ...rest }: EmojiListProps) {
  return (
    <Grid
      gridTemplateColumns='repeat(auto-fill, 50px)'
      justifyContent='center'
      as='ul'
      listStyleType='none'
      {...rest}
    >
      {list.map((emoji) => (
        <Emoji emoji={emoji.emoji} key={emoji.emoji} />
      ))}
    </Grid>
  );
}

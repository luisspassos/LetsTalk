import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useEmoji } from '../../../../../../../contexts/EmojiContext';
import { CategoryTitle } from './Categories/CategoryTitle';
import { EmojiList } from './EmojiList';

export function Component() {
  const { emoji } = useEmoji();

  useEffect(() => {
    console.log(emoji);
  }, [emoji]);

  return (
    <Stack spacing='5px'>
      <CategoryTitle text={'Recentes'} />
      <EmojiList list={[...emoji]} />
    </Stack>
  );
}

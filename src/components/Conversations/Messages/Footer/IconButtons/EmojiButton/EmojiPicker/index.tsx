import { Collapse, Flex as ChakraFlex } from '@chakra-ui/react';

import { Divider } from '../../../../../../Divider';
import { SearchInput } from './SearchInput';
import { CategoryTitle } from './Categories/CategoryTitle';
import { Categories } from './Categories';
import { useEmoji } from '../../../../../../../contexts/EmojiContext';
import { Emoji } from './EmojiList/Emoji';
import { memo, ReactNode, useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';

const Flex = memo(({ children }: { children: ReactNode }) => {
  return <ChakraFlex>{children}</ChakraFlex>;
});

const sizes = [
  55, 18, 46, 46, 46, 46, 18, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
];

export function EmojiPicker() {
  const {
    searchedEmojis: { data: searchedEmojis },
    categories: {
      data: { data },
    },
    togglePicker: { isOpen },
  } = useEmoji();

  const components = [
    <SearchInput key='0' />,
    <CategoryTitle text={data[0].name} key='1' />,
    <Flex key='2'>
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
    </Flex>,
    <Flex key='3'>
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
    </Flex>,
    <Flex key='4'>
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
    </Flex>,
    <Flex key='5'>
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
      <Emoji emoji='😂' />
    </Flex>,
    <CategoryTitle key='6' text={data[1].name} />,
    <Flex key='7'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='8'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='9'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='10'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='11'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='12'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='13'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='14'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='15'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='16'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='17'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='18'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='19'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='20'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='21'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='22'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='23'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='24'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='25'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='26'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='27'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='28'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='29'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='30'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='31'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='32'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='33'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='34'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='35'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='36'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='37'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='38'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='39'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='40'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='41'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='42'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='43'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='44'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='45'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='46'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='48'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='49'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='50'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
    <Flex key='51'>
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
      <Emoji emoji='😍' />
    </Flex>,
  ];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: components.length,
    parentRef,
    estimateSize: useCallback((i) => sizes[i], []),
    overscan: 0,
  });

  return (
    <Collapse in={isOpen} unmountOnExit>
      <ChakraFlex h='300px' w='100%' direction='column'>
        <Divider />
        <Categories />
        <div
          ref={parentRef}
          style={{
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.totalSize}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.virtualItems.map((virtualRow) => (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${sizes[virtualRow.index]}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {components[virtualRow.index]}
              </div>
            ))}
          </div>
        </div>
      </ChakraFlex>
    </Collapse>
  );
}

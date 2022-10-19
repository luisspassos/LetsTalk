import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { emojis } from '../../../../../../../../utils/emojis';
import { CategoryTitle } from './CategoryTitle';
import { Emoji, size as emojiSize } from './Emoji';
import { SearchInput } from './SearchInput';

export function Scroll() {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth;

  const emojiWidth = useBreakpointValue(emojiSize);

  const emojisPerRow = Math.floor(width / emojiWidth);

  const components: (JSX.Element | JSX.Element[])[] = [
    <SearchInput key='searchInput' />,
  ];

  for (const categoryName in emojis) {
    components.push(<CategoryTitle text={categoryName} />);

    const category = emojis[categoryName];

    const categoryEmojis: JSX.Element[][] = [[]];

    for (const emoji of category) {
      const i = categoryEmojis.length - 1;

      if (categoryEmojis[i].length === emojisPerRow) {
        categoryEmojis.push([]);
      }

      const newI = categoryEmojis.length - 1;

      categoryEmojis[newI].push(<Emoji emoji={emoji.emoji} />);
    }

    for (const category of categoryEmojis) {
      components.push(category);
    }
  }

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
  });

  return (
    <Box ref={parentRef} overflow='auto'>
      <Box h={virtualizer.totalSize} w='100%' pos='relative'>
        {virtualizer.virtualItems.map((item) => {
          const component = components[item.index];

          const isEmojis = Array.isArray(component);

          return (
            <Box
              key={item.index}
              ref={item.measureRef}
              pos='absolute'
              top={0}
              left={0}
              display='flex'
              w='100%'
              pl={isEmojis ? '10px' : undefined}
              transform={`translateY(${item.start}px)`}
            >
              {component}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { emojiCategories } from '../../../../../../../../utils/emojiCategories';
import { CategoryTitle } from './CategoryTitle';
import { Emoji, size as emojiSize } from './Emoji';
import { SearchInput } from './SearchInput';

type EmojiRows = JSX.Element[];

export function Scroll() {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth ?? 0;

  const emojiWidth = useBreakpointValue(emojiSize) ?? 0;

  const emojisPerRow = Math.floor(width / emojiWidth);

  const components: (JSX.Element | EmojiRows)[] = [
    <SearchInput key='searchInput' />,
  ];

  function insertEmojis() {
    for (const categoryName in emojiCategories) {
      components.push(<CategoryTitle text={categoryName} />);

      const category = emojiCategories[categoryName];

      const emojiRows: EmojiRows[] = [[]];

      for (const emoji of category) {
        const getCurrentEmojiRow = () => {
          const index = emojiRows.length - 1;

          return emojiRows[index];
        };

        const row = getCurrentEmojiRow();

        const rowIsFilled = row.length === emojisPerRow;

        if (rowIsFilled) emojiRows.push([]);

        const rowToBeFilled = getCurrentEmojiRow();

        rowToBeFilled.push(<Emoji emoji={emoji.emoji} key={emoji.emoji} />);
      }

      for (const row of emojiRows) {
        components.push(row);
      }
    }
  }

  insertEmojis();

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
            <Flex
              key={item.key}
              ref={item.measureRef}
              pos='absolute'
              top={0}
              left={0}
              w='100%'
              pl={isEmojis ? '10px' : undefined}
              transform={`translateY(${item.start}px)`}
            >
              {component}
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}

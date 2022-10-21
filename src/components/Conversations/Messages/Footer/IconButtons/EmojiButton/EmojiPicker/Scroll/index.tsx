import { useBreakpointValue } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { emojiCategories } from '../../../../../../../../utils/emojiCategories';
import { CategoryTitle } from './CategoryTitle';
import { Emoji, size as emojiSize } from './Emoji';
import { VariableSizeList as List } from 'react-window';
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

  const Component = ({ index }) => {
    return components[index];
  };

  return (
    <List height={100} width='100%' itemCount={components.length}>
      {Component}
    </List>
  );
}

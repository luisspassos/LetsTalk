import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import {
  useEmoji,
  Emoji as EmojiType,
} from '../../../../../../../../contexts/EmojiContext';
import { emojiCategories } from '../../../../../../../../utils/emojiCategories';
import { CategoryTitle } from './CategoryTitle';
import { Emoji } from './Emoji';
import { SearchInput } from './SearchInput';

type EmojiRow = JSX.Element[];

export function Scroll() {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth || 0;

  const {
    emojiPickerStyles,
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const emojisPerRow = Math.floor(width / emojiPickerStyles.emojiSize);

  const components: (JSX.Element | EmojiRow)[] = [
    <SearchInput key='searchInput' />,
  ];

  function insertEmojis() {
    function fillEmojiRows(emoji: EmojiType, rows: EmojiRow[]) {
      const getCurrentEmojiRow = () => {
        const index = rows.length - 1;

        return rows[index];
      };

      const row = getCurrentEmojiRow();

      const rowIsFilled = row.length === emojisPerRow;

      if (rowIsFilled) rows.push([]);

      const rowToBeFilled = getCurrentEmojiRow();

      rowToBeFilled.push(<Emoji key={emoji}>{emoji}</Emoji>);
    }

    function fillComponents(emojiRows: EmojiRow[]) {
      for (const row of emojiRows) {
        components.push(row);
      }
    }

    if (searchedEmojis) {
      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of searchedEmojis) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const categoryName in emojiCategories) {
      components.push(<CategoryTitle text={categoryName} />);

      const category = emojiCategories[categoryName];

      const emojiRows: EmojiRow[] = [[]];

      for (const { emoji } of category) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);
    }
  }

  insertEmojis();

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  return (
    <div ref={parentRef} style={{ overflow: 'auto', scrollBehavior: 'smooth' }}>
      <div
        style={{
          height: virtualizer.totalSize,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.virtualItems.map((item) => {
          const component = components[item.index];

          const isEmojis = Array.isArray(component);

          return (
            <div
              key={item.key}
              ref={item.measureRef}
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                paddingLeft: isEmojis ? '10px' : undefined,
                transform: `translateY(${item.start}px)`,
              }}
            >
              {component}
            </div>
          );
        })}
      </div>
    </div>
  );
}

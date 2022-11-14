import { useEffect, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { useA } from '../../../../../../../../contexts/EmojiPicker/AContext';
import {
  useCategories,
  Emoji as EmojiType,
} from '../../../../../../../../contexts/EmojiPicker/CategoriesContext';
import { useEmojiStyles } from '../../../../../../../../contexts/EmojiPicker/EmojiStylesContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';
import { CategoryTitle } from './CategoryTitle';
import { Emoji } from './Emoji';
import { SearchInput } from './SearchInput';

type EmojiRow = JSX.Element[];

type CategoryIndices = number[];

export function Scroll() {
  const {
    searchedEmojis: { search },
    searchedEmojis,
  } = useSearchedEmojis();

  const { categories } = useCategories();

  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth ?? 0;

  const { emojiStyles } = useEmojiStyles();

  const emojisPerRow = Math.floor(width / emojiStyles.emojiSize);

  const components: (JSX.Element | EmojiRow)[] = [
    <SearchInput key='searchInput' />,
  ];

  const categoryIndices: CategoryIndices = [];

  function insertEmojisAndInsertCategoryIndices() {
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

    if (search) {
      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of searchedEmojis.data) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const { name, emojis } of categories.data) {
      const categoryTitle = <CategoryTitle text={name} />;

      components.push(categoryTitle);

      categoryIndices.push(components.indexOf(categoryTitle));

      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of emojis) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);
    }
  }

  insertEmojisAndInsertCategoryIndices();

  const virtualizer = useVirtual({
    size: components?.length ?? 0,
    parentRef: parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0]?.index;

  const currentCategoryIndex =
    categoryIndices?.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? 999;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices?.[0];

  const currentCategoryPositionA = search
    ? 0
    : categoryIndices?.indexOf(currentCategoryIndex);

  const { setCurrent } = useA();

  useEffect(() => {
    setCurrent(currentCategoryPositionA);
  }, [currentCategoryPositionA, setCurrent]);

  return (
    <div ref={parentRef} style={{ overflow: 'auto' }}>
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
                paddingRight: '10px',
                paddingLeft: isEmojis && !search ? '10px' : undefined,
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

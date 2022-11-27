import { useEffect, useRef } from 'react';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';
import { Item } from '../../../../../../../Virtualizer/Dynamic/Item';
import { ScrollableBoxOfVirtualizedItems } from '../../../../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';
import { VirtualizedItemsListWrapper } from '../../../../../../../Virtualizer/VirtualizedItemsListWrapper';

export function Scroll() {
  const ref = useRef<HTMLDivElement>(null);

  const { virtualizer, components, setParentRef } = useEmojiPickerScroll();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();

  useEffect(() => {
    setParentRef(ref);
  }, [setParentRef]);

  return (
    <ScrollableBoxOfVirtualizedItems ref={ref}>
      <VirtualizedItemsListWrapper totalSize={virtualizer.totalSize}>
        {virtualizer.virtualItems.map((item) => {
          const component = components[item.index];

          const isEmojis = Array.isArray(component);

          return (
            <Item
              key={item.key}
              start={item.start}
              ref={item.measureRef}
              style={{
                display: 'flex',
                paddingRight: '10px',
                paddingLeft: isEmojis && !search ? '10px' : undefined,
              }}
            >
              {component}
            </Item>
          );
        })}
      </VirtualizedItemsListWrapper>
    </ScrollableBoxOfVirtualizedItems>
  );
}

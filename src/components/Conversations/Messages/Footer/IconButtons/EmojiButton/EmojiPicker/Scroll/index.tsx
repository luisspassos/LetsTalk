import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';

export function Scroll() {
  const { virtualizer, components, parentRef } = useEmojiPickerScroll();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();

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

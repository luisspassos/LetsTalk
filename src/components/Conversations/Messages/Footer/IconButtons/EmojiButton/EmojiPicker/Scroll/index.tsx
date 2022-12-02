import { useEffect, useRef } from 'react';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';

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
    <div
      style={{
        overflow: 'auto',
      }}
      ref={ref}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          height: virtualizer.totalSize,
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${item.start}px)`,
                display: 'flex',
                paddingRight: '10px',
                paddingLeft: isEmojis && !search ? '10px' : undefined,
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

{
  /* <div
  ref={ref}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transform: `translateY(${start}px)`,
    ...style,
  }}
  {...rest}
>
  {children}
</div>; */
}

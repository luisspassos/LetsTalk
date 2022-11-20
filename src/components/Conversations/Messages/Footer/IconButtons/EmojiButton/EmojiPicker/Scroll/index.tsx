import { useCategories } from '../../../../../../../../contexts/EmojiPicker/CategoriesContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';

export function Scroll() {
  const { parentRef, virtualizer, components } = useEmojiPickerScroll();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();

  const { categories } = useCategories();

  return (
    <>
      {/* <div style={{ display: 'flex' }}>
        {categories.data.map(({ icon, name }, i) => (
          <Button index={i} CategoryIcon={icon} aria-label={name} key={name} />
        ))}
      </div> */}
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
    </>
  );
}

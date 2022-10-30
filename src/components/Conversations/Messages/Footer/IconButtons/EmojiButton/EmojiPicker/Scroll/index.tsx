import { useScroll } from '../../../../../../../../contexts/ScrollContext';

export function Scroll() {
  const { components, parentRef, virtualizer } = useScroll();

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
                paddingRight: '10px',
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

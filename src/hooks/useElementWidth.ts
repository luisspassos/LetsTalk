import { useState, useRef, useEffect } from 'react';
import { resizeObserver } from 'utils/resizeObserver';

export function useElementWidth<Ref extends HTMLElement>() {
  const [width, setWidth] = useState(0);

  const ref = useRef<Ref>(null);

  // get container width
  useEffect(() => {
    const element = ref.current;

    if (element === null) return;

    function getContainerWidth() {
      const element = ref.current;
      const newOffsetWidth = element?.offsetWidth;

      if (newOffsetWidth === undefined) return;

      setWidth(newOffsetWidth);
    }

    const { unobserve } = resizeObserver(getContainerWidth, element);

    return () => {
      unobserve();
    };
  }, []);

  return { width, ref };
}

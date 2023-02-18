import { useEffect, useState } from 'react';
import { resizeObserver } from 'utils/resizeObserver';

type Element = HTMLElement | undefined | null;

export function useFontSizeBasedOnWidth(
  elementOrWidth: Element | number,
  valueThatDividesWidth: number
) {
  const [fontSize, setFontSize] = useState('1rem');

  useEffect(() => {
    function getFontSize(width: number) {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      const newFontSize = width / valueThatDividesWidth / rem;

      const fontSize = newFontSize + 'rem';

      setFontSize(fontSize);
    }

    const isWidth = typeof elementOrWidth === 'number';

    if (isWidth) {
      getFontSize(elementOrWidth);

      return;
    }

    if (!elementOrWidth) return;

    const callback = () => {
      const width = elementOrWidth.offsetWidth;

      getFontSize(width);
    };

    const { unobserve } = resizeObserver(callback, elementOrWidth);

    return () => {
      unobserve();
    };
  }, [elementOrWidth, valueThatDividesWidth]);

  return { fontSize };
}

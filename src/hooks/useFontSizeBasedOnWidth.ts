import { RefObject, useEffect, useState } from 'react';
import { resizeObserver } from 'utils/resizeObserver';

type Element = HTMLElement | undefined | null;
type Ref = RefObject<HTMLElement>;

type RefOrElementOrWidth = Ref | Element | number;

export function useFontSizeBasedOnWidth(
  valueThatGivesWidth: RefOrElementOrWidth,
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

    const isWidth = typeof valueThatGivesWidth === 'number';

    if (isWidth) {
      getFontSize(valueThatGivesWidth);

      return;
    }

    if (!valueThatGivesWidth) return;

    const isNotRef = valueThatGivesWidth instanceof HTMLElement;

    const element = isNotRef
      ? valueThatGivesWidth
      : valueThatGivesWidth.current;

    if (element === null) return;

    const callback = () => {
      const width = element?.offsetWidth;

      getFontSize(width);
    };

    const { unobserve } = resizeObserver(callback, element);

    return () => {
      unobserve();
    };
  }, [valueThatDividesWidth, valueThatGivesWidth]);

  return { fontSize };
}

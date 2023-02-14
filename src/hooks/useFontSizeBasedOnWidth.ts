import { useCallback, useEffect, useState } from 'react';
import { WindowEvent, iterateEvents } from 'utils/iterateEvents';

type Element = HTMLElement | undefined | null;

export function useFontSizeBasedOnWidth(
  element: Element,
  valueThatDividesWidth: number
) {
  const [fontSize, setFontSize] = useState('');

  const getFontSize = useCallback(() => {
    if (element === null || element === undefined) return;

    const newFontSize = element.offsetWidth / valueThatDividesWidth;

    const fontSize = newFontSize + 'px';

    setFontSize(fontSize);
  }, [element, valueThatDividesWidth]);

  useEffect(() => {
    getFontSize();
  }, [getFontSize]);

  // set window events
  useEffect(() => {
    const events: WindowEvent[] = [
      {
        type: 'resize',
        func: getFontSize,
      },
    ];

    iterateEvents('add', events, window);

    return () => {
      iterateEvents('remove', events, window);
    };
  }, [getFontSize]);

  return { fontSize };
}

import { useEffect, useState } from 'react';

type Element = HTMLElement | undefined | null;

export function useFontSizeBasedOnWidth(
  elementOrWidth: Element | number,
  valueThatDividesWidth: number
) {
  const [fontSize, setFontSize] = useState('1rem');

  useEffect(() => {
    function getFontSize(width: number) {
      const newFontSize = width / valueThatDividesWidth;

      const fontSize = newFontSize + 'px';

      setFontSize(fontSize);
    }

    const isWidth = typeof elementOrWidth === 'number';

    if (isWidth) {
      getFontSize(elementOrWidth);

      return;
    }

    if (!elementOrWidth) return;

    const width = elementOrWidth.offsetWidth;

    const resizeObserver = new ResizeObserver(() => getFontSize(width));

    resizeObserver.observe(elementOrWidth);

    return () => {
      resizeObserver.unobserve(elementOrWidth);
    };
  }, [elementOrWidth, valueThatDividesWidth]);

  return { fontSize };

  // const returnObj = {
  //   fontSize,
  // };

  // const getFontSize = useCallback(() => {
  //   const width = valueReceivedIsAWidth
  //     ? elementOrWidth
  //     : elementOrWidth.offsetWidth;

  //   const newFontSize = width / valueThatDividesWidth;

  //   const fontSize = newFontSize + 'px';

  //   setFontSize(fontSize);
  // }, [elementOrWidth, valueReceivedIsAWidth, valueThatDividesWidth]);

  // useEffect(() => {
  //   getFontSize();
  // }, [getFontSize]);

  // // set window events
  // useEffect(() => {
  //   const events: WindowEvent[] = [
  //     {
  //       type: 'resize',
  //       func: getFontSize,
  //     },
  //   ];

  //   iterateEvents('add', events, window);

  //   return () => {
  //     iterateEvents('remove', events, window);
  //   };
  // }, [getFontSize]);
}

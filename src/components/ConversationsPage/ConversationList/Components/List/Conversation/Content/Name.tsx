import { Heading } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { iterateEvents, WindowEvent } from 'utils/iterateEvents';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  const [element, setElement] = useState<HTMLHeadingElement | null>(null);
  const [fontSize, setFontSize] = useState('');

  const getFontSize = useCallback(() => {
    const offsetWidth = element?.parentElement?.parentElement?.offsetWidth;

    if (offsetWidth === undefined) return;

    const newFontSize = offsetWidth / 12.5;

    const fontSizeMeasure = newFontSize + 'px';

    setFontSize(fontSizeMeasure);
  }, [element?.parentElement?.parentElement?.offsetWidth]);

  useEffect(() => {
    getFontSize();
  }, [getFontSize]);

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

  return (
    <Heading
      ref={setElement}
      textOverflow='ellipsis'
      overflow='hidden'
      whiteSpace='nowrap'
      fontSize={fontSize}
      w='90%'
      fontWeight={400}
      as='h3'
    >
      luissssssssssssssssssssssssssssssssssssss
    </Heading>
  );
}

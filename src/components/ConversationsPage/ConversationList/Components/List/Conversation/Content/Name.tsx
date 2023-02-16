import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useState } from 'react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  const [element, setElement] = useState<HTMLHeadingElement | null>(null);

  const { fontSize } = useFontSizeBasedOnWidth(
    element?.parentElement?.parentElement,
    12.5
  );

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

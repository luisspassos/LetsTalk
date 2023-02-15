import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(
    ref.current?.parentElement?.parentElement,
    12.5
  );

  return (
    <Heading
      ref={ref}
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

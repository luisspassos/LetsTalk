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
    12
  );

  return (
    <Heading
      ref={ref}
      textOverflow='ellipsis'
      overflow='hidden'
      whiteSpace='nowrap'
      // fontSize={fontSize}
      fontSize='17px'
      fontWeight={400}
      as='h3'
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate
      culpa sed reiciendis ipsam quam ad ducimus explicabo cum non. Deserunt
      esse minima placeat enim corporis aut possimus qui voluptatum!
    </Heading>
  );
}

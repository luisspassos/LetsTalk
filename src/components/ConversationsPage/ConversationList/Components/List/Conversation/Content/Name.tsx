import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

type NameProps = {
  text: string;
};

export function Name({ text }: NameProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(ref.current?.parentElement, 2);

  return (
    <Heading
      ref={ref}
      maxW={['110px', '130px', '150px']}
      isTruncated
      fontSize={fontSize}
      fontWeight={400}
    >
      {text}
    </Heading>
  );
}

import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

export function Title() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(ref.current?.parentElement, 9.2);

  return (
    <Heading ref={ref} as='h1' fontWeight={400} fontSize={fontSize}>
      Conversas
    </Heading>
  );
}

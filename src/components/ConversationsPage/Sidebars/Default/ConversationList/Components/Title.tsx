import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { useRef } from 'react';

export function Title() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { fontSize } = useFontSizeBasedOnMeasurement(
    ref.current?.parentElement,
    9.2
  );

  return (
    <Heading ref={ref} as='h1' fontWeight={400} fontSize={fontSize}>
      Conversas
    </Heading>
  );
}

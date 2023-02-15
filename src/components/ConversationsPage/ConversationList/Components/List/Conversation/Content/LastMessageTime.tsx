import { Text, useColorModeValue } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

type LastMessageTimeProps = {
  text: string;
};

export function LastMessageTime({ text }: LastMessageTimeProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(
    ref.current?.parentElement?.parentElement,
    17
  );

  return (
    <Text
      ref={ref}
      as='time'
      // fontSize={['11px', '12px', '13px']}
      fontSize='.95vw'
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
    >
      22/09/2024
    </Text>
  );
}

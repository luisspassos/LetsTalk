import { Text, useColorModeValue } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

type LastMessageProps = {
  text: string;
};

export function LastMessage({ text }: LastMessageProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(ref.current?.parentElement, 9.8);

  return (
    <Text
      as='small'
      ref={ref}
      w='100%'
      fontSize={fontSize}
      isTruncated
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
    >
      🤠🤡🤡🤠dsadasddasdasdsadasdas
    </Text>
  );
}

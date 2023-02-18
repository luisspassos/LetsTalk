import { Text, useColorModeValue } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';
import { ChildrenProps } from '../../Container';

type LastMessageTimeProps = {
  text: string;
} & ChildrenProps;

export function LastMessageTime({
  text,
  containerWidth,
}: LastMessageTimeProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(containerWidth, 25);

  return (
    <Text
      ref={ref}
      as='time'
      fontSize={fontSize}
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
    >
      22/09/2024
    </Text>
  );
}

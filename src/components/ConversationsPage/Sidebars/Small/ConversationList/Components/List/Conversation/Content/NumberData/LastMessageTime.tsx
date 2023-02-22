import { Text, useColorModeValue } from '@chakra-ui/react';
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

  return (
    <Text
      ref={ref}
      as='time'
      fontSize='0.725em'
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
    >
      22/09/2024
    </Text>
  );
}

import { Text, useColorModeValue } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { ChildrenProps } from '../Container';

type LastMessageProps = {
  text: string;
} & ChildrenProps;

export function LastMessage({ text, containerWidth }: LastMessageProps) {
  const { fontSize } = useFontSizeBasedOnWidth(containerWidth, 23);

  return (
    <Text
      as='small'
      w='100%'
      fontSize={fontSize}
      isTruncated
      color={useColorModeValue('lastMessage.light', 'lastMessage.dark')}
    >
      🤠🤡🤡🤠dsadasddasdasdsadasdas
    </Text>
  );
}

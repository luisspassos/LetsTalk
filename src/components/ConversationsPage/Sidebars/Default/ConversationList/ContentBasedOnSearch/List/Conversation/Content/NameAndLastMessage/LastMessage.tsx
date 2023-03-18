import { Text, useColorModeValue } from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { ChildrenProps } from '../../Container';

type LastMessageProps = {
  text: string;
} & ChildrenProps;

export function LastMessage({ text, containerWidth }: LastMessageProps) {
  const { fontSize } = useFontSizeBasedOnMeasurement(containerWidth, 23);

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

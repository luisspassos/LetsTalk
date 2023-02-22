import { Text, useColorModeValue } from '@chakra-ui/react';
import { ChildrenProps } from '../../Container';

type LastMessageProps = {
  text: string;
} & ChildrenProps;

export function LastMessage({ text, containerWidth }: LastMessageProps) {
  return (
    <Text
      as='small'
      w='100%'
      fontSize='0.78804375em'
      isTruncated
      color={useColorModeValue('lastMessage.light', 'lastMessage.dark')}
    >
      🤠🤡🤡🤠dsadasddasdasdsadasdalore
      🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore
    </Text>
  );
}

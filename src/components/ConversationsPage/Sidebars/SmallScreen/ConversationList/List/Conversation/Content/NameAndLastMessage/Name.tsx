import { Heading } from '@chakra-ui/react';
import { ChildrenProps } from '../../Container';

type NameProps = {
  text: string;
} & ChildrenProps;

export function Name({ text, containerWidth }: NameProps) {
  return (
    <Heading isTruncated fontSize='0.90625em' w='90%' fontWeight={400} as='h3'>
      luissssssssssssssssssssssssssssssssssssss🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore🤠🤡🤡🤠dsadasddasdasdsadasdalore
    </Heading>
  );
}

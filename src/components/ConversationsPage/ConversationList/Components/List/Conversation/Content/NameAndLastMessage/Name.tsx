import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { ChildrenProps } from '../../Container';

type NameProps = {
  text: string;
} & ChildrenProps;

export function Name({ text, containerWidth }: NameProps) {
  const { fontSize } = useFontSizeBasedOnWidth(containerWidth, 20);

  return (
    <Heading isTruncated fontSize={fontSize} w='90%' fontWeight={400} as='h3'>
      luissssssssssssssssssssssssssssssssssssss
    </Heading>
  );
}

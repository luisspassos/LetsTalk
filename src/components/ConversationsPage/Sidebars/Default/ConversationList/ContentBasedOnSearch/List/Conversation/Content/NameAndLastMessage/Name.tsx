import { Heading } from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { ChildrenProps } from '../../Container';

type NameProps = {
  text: string;
} & ChildrenProps;

export function Name({ text, containerWidth }: NameProps) {
  const { fontSize } = useFontSizeBasedOnMeasurement(containerWidth, 20);

  return (
    <Heading isTruncated fontSize={fontSize} w='90%' fontWeight={400} as='h3'>
      {text}
    </Heading>
  );
}

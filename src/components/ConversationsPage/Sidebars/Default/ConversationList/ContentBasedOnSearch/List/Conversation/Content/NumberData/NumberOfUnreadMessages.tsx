import { ChakraProps } from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { Circle } from 'components/Circle';
import { ChildrenProps } from '../../Container';

type NumberOfUnreadMessagesProps = {
  number: number;
} & ChildrenProps;

export function NumberOfUnreadMessages({
  number,
  containerWidth,
}: NumberOfUnreadMessagesProps) {
  const { fontSize } = useFontSizeBasedOnMeasurement(containerWidth, 26);

  const styles: ChakraProps = {
    w: '1.5em',
  };

  return (
    <Circle
      fontSize={fontSize}
      display='block'
      textAlign='center'
      lineHeight={styles.w}
      sx={{
        aspectRatio: '1 / 1',
      }}
      color='white'
      bg='gray.500'
      pos='relative'
      {...styles}
    >
      2
    </Circle>
  );
}

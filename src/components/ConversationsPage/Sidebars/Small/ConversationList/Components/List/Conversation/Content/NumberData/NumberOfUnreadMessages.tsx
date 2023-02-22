import { ChakraProps } from '@chakra-ui/react';
import { Circle } from 'components/Circle';
import { ChildrenProps } from '../../Container';

type NumberOfUnreadMessagesProps = {
  number: number;
} & ChildrenProps;

export function NumberOfUnreadMessages({
  number,
  containerWidth,
}: NumberOfUnreadMessagesProps) {
  const styles: ChakraProps = {
    w: '1.5em',
  };

  return (
    <Circle
      fontSize='0.6971125em'
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

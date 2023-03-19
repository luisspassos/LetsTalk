import { useMediaQuery } from '@chakra-ui/react';
import { AudioPlayer as Base } from '../AudioPlayer';
import { spacing } from '../AudioPlayer/Component';

export function AudioPlayer() {
  const [isSmallerThan340] = useMediaQuery('(max-width: 340px)');

  return (
    <Base
      gap={isSmallerThan340 ? '3px' : spacing}
      px={isSmallerThan340 ? '7px' : spacing}
    />
  );
}

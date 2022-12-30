import { Box } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Image } from './Image';

export function Avatar() {
  return (
    <Box pos='relative' mr='.75em' bg='inherit'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image />
      <Icon />
    </Box>
  );
}

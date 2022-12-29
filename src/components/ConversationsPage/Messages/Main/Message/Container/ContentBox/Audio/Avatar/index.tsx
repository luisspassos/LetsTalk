import { Box } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Image } from './Image';

export function Avatar() {
  return (
    <Box pos='relative' mr='11px'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image />
      <Icon />
    </Box>
  );
}

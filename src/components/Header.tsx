import { Box } from '@chakra-ui/react';
import { Logo } from './Logo';

export function Header() {
  return (
    <Box as='header' px={['8', '10']} pt={['4', '6']}>
      <Logo />
    </Box>
  );
}

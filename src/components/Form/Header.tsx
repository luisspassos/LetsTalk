import { Box, Img } from '@chakra-ui/react';

export function Header() {
  return (
    <Box as='header' px={['8', '10']} pt={['4', '6']}>
      <Img h={['40px', '45px']} src='/images/logo_light.svg' alt="Let's Talk" />
    </Box>
  );
}

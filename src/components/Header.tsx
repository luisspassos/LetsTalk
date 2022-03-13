import { Box, Img } from '@chakra-ui/react';
import { memo } from 'react';

function HeaderComponent() {
  return (
    <Box as='header' px={['8', '10']} pt={['4', '6']}>
      <Img h={['40px', '45px']} src='/images/logo_light.svg' alt="Let's Talk" />
    </Box>
  );
}

export const Header = memo(HeaderComponent);

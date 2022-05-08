import { Box, Image, useColorModePreference } from '@chakra-ui/react';

export function Header() {
  const colorModePreference = useColorModePreference();

  return (
    <Box as='header' px={['8', '10']} pt={['4', '6']}>
      {colorModePreference && (
        <Image
          // h={['40px', '45px']}
          // w='193.75px'
          src={
            colorModePreference === 'dark'
              ? '/images/logo_light_png.png'
              : '/images/logo_dark.svg'
          }
          alt="Let's Talk"
        />
      )}
    </Box>
  );
}

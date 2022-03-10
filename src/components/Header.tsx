import { Box, Img } from "@chakra-ui/react";

export function Header() {
  return (
    <Box as="header" px="10" py="6">
      <Img h="45px" src="/images/logo_light.svg" alt="Let's Talk" />
    </Box>
  );
}

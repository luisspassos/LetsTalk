import { Box, Image as ChakraImage } from '@chakra-ui/react';

const borderRadius = '5px';

type MainProps = {
  url: string;
};

export function Main({ url }: MainProps) {
  return (
    <Box
      borderRadius={borderRadius}
      mr='auto'
      bg='gray.400'
      p='5px'
      boxShadow='lg'
    >
      <ChakraImage
        borderRadius={borderRadius}
        maxH='70vh'
        src={url}
        alt='image'
      />
    </Box>
  );
}

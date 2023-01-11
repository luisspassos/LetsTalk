import {
  useColorModeValue,
  SliderTrack as ChakraSliderTrack,
  SliderFilledTrack,
} from '@chakra-ui/react';

export function SliderTrack() {
  return (
    <ChakraSliderTrack
      boxShadow='sm'
      bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
    >
      <SliderFilledTrack transition='6s linear' />
    </ChakraSliderTrack>
  );
}

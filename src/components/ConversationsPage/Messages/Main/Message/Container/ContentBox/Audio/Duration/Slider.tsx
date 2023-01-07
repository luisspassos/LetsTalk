import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider as ChakraSlider,
  useColorModeValue,
} from '@chakra-ui/react';

export function Slider() {
  return (
    <ChakraSlider aria-label='Barra de progresso do áudio' defaultValue={0}>
      <SliderTrack
        boxShadow='sm'
        bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
      >
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
}

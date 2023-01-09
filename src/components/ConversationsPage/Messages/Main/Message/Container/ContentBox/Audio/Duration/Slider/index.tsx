import { SliderThumb, Slider as ChakraSlider } from '@chakra-ui/react';
import { SliderTrack } from './SliderTrack';

type SliderProps = {
  audio: HTMLAudioElement;
};

export function Slider({ audio }: SliderProps) {
  return (
    <ChakraSlider aria-label='Barra de progresso do áudio' defaultValue={0}>
      <SliderTrack />
      <SliderThumb />
    </ChakraSlider>
  );
}

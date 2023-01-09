import { SliderThumb, Slider as ChakraSlider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Event, iterateEvents } from '../..';
import { SliderTrack } from './SliderTrack';

type SliderProps = {
  audio: HTMLAudioElement;
};

export function Slider({ audio }: SliderProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    function getValue() {
      const newValue = (audio.currentTime / audio.duration) * 100; // is a percentage;

      setValue(newValue);
    }

    const events: Event[] = [
      {
        type: 'timeupdate',
        func: getValue,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio]);

  return (
    <ChakraSlider aria-label='Barra de progresso do áudio' value={value}>
      <SliderTrack />
      <SliderThumb />
    </ChakraSlider>
  );
}

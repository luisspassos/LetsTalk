import { Slider as ChakraSlider, SliderThumb } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Event, iterateEvents } from '../..';
import { SliderTrack } from './SliderTrack';

type SliderProps = {
  audio: HTMLAudioElement;
};

export function Slider({ audio }: SliderProps) {
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    function getDuration() {
      setDuration(audio.duration);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: getDuration,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio]);

  useEffect(() => {
    setTimeout(() => {
      setValue(100);
    }, 5000);
  }, []);

  return (
    <ChakraSlider
      focusThumbOnChange={false}
      aria-label='Barra de progresso do áudio'
      value={value}
    >
      <SliderTrack />
      <SliderThumb transition={`6s linear`} />
    </ChakraSlider>
  );
}

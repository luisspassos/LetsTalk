import { useEffect, useState } from 'react';
import { Event, iterateEvents } from '../..';

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

    function a() {
      setValue((audio.currentTime / audio.duration) * 100);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: getDuration,
      },
      {
        type: 'timeupdate',
        func: a,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValue(100);
  //   }, 5000);
  // }, []);

  return (
    // <ChakraSlider
    //   focusThumbOnChange={false}
    //   aria-label='Barra de progresso do áudio'
    //   value={value}
    // >
    //   <SliderTrack />
    <input
      type='range'
      name=''
      id=''
      // value={value}
      style={{ transition: '5s linear' }}
    />
    // {/* <SliderThumb transition={`180s linear`} /> */}
    // </ChakraSlider>
  );
}

import {
  Center,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Button,
  SliderThumb,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function AudioPage() {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setAudio(new Audio('horse.wav'));
  }, []);

  const play = audio?.play.bind(audio);

  setInterval(() => {
    if (!audio || audio.paused === true) return;

    const newValue = Math.floor((audio?.currentTime / audio?.duration) * 100);

    setValue(newValue);
  }, 30);

  return (
    <Center gap='10px' height='100vh'>
      <Button onClick={play}>Play</Button>
      <Slider w='100px' aria-label='slider-ex-1' value={value}>
        <SliderTrack>
          <SliderFilledTrack transition='.3s linear' />
        </SliderTrack>
        <SliderThumb transition='0.3s linear' />
      </Slider>
    </Center>
  );
}

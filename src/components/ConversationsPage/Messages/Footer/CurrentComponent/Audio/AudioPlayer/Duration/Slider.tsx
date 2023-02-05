import {
  Slider as SliderComponent,
  SliderProps,
} from 'components/Audio/Slider';

type Props = {
  duration: SliderProps['duration'];
};

export function Slider({ duration }: Props) {
  return (
    <SliderComponent
      duration={duration}
      height='0.8125rem'
      progressBarProps={{ bgColor: 'whiteAlpha.500' }}
    />
  );
}

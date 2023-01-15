import { AnimationBox } from '../AnimationBox';
import { Circle } from './Circle';

export function Thumb() {
  return (
    <AnimationBox
      pos='absolute'
      display='flex'
      alignItems='center'
      pointerEvents='none'
    >
      <Circle />
    </AnimationBox>
  );
}

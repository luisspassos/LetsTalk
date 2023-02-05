import { SharedProps } from '..';
import { AnimationBox } from '../AnimationBox';
import { Circle } from './Circle';

type ThumbProps = SharedProps;

export function Thumb(props: ThumbProps) {
  return (
    <AnimationBox
      pos='absolute'
      display='flex'
      alignItems='center'
      pointerEvents='none'
      {...props}
    >
      <Circle />
    </AnimationBox>
  );
}

import { SharedProps } from '.';
import { AnimationBox } from './AnimationBox';

type TrackProps = SharedProps;

export function Track(props: TrackProps) {
  return <AnimationBox bg='blue.300' pos='relative' {...props} />;
}

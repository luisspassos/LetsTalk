import { ContainerProps } from '.';
import { AnimationBox } from './AnimationBox';

type TrackProps = ContainerProps;

export function Track(props: TrackProps) {
  return <AnimationBox bg='blue.300' pos='relative' {...props} />;
}

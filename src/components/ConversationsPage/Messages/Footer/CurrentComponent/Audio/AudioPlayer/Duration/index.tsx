import { useDuration } from 'hooks/Audio/useDuration';
import { Slider } from './Slider';
import { Text } from './Text';

export function Duration() {
  const { duration } = useDuration();

  return (
    <>
      <Slider duration={duration} />
      <Text duration={duration} />
    </>
  );
}

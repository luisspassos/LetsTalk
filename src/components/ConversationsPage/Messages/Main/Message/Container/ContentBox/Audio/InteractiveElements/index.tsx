import { CurrentButton } from 'components/Audio/Buttons/CurrentButton';
import { useInitializeAudio } from 'hooks/Audio/useInitializeAudio';
import { Duration } from './Duration';

type InteractiveElementsProps = {
  index: number;
};

export function InteractiveElements({ index }: InteractiveElementsProps) {
  useInitializeAudio('horse.wav', index);

  return (
    <>
      <CurrentButton />
      <Duration />
    </>
  );
}

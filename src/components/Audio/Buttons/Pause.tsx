import { useAudio } from 'contexts/Audio/AudioContext';
import { BsPauseFill } from 'react-icons/bs';
import { Base } from './Base';
import { ButtonProps } from './CurrentButton';

export function PauseButton({ ...rest }: ButtonProps) {
  const { setIsPlaying } = useAudio();

  function handlePause() {
    setIsPlaying(false);
  }

  return (
    <Base
      aria-label='Pausar áudio'
      icon={<BsPauseFill />}
      onClick={handlePause}
      {...rest}
    />
  );
}

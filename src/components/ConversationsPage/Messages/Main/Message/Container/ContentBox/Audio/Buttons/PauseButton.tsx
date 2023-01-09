import { BsPauseFill } from 'react-icons/bs';
import { Button } from './Button';
import { SetIsPlaying } from './CurrentButton';

type PauseButtonProps = {
  pause: HTMLAudioElement['pause'];
  setIsPlaying: SetIsPlaying;
};

export function PauseButton({ pause, setIsPlaying }: PauseButtonProps) {
  function handlePause() {
    pause();
    setIsPlaying(false);
  }

  return (
    <Button
      onClick={handlePause}
      aria-label='Pausar áudio'
      icon={<BsPauseFill />}
    />
  );
}

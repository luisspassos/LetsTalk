import { BsPauseFill } from 'react-icons/bs';
import { SetIsPlaying } from '..';
import { Button } from './Button';

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

import { BsPauseFill } from 'react-icons/bs';
import { Button } from './Base';
import { SetIsPlaying } from './CurrentButton';

type PauseButtonProps = {
  setIsPlaying: SetIsPlaying;
};

export function PauseButton({ setIsPlaying }: PauseButtonProps) {
  function handlePause() {
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

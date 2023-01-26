import { BsFillPlayFill } from 'react-icons/bs';
import { Button } from './Button';
import { SetIsPlaying } from './CurrentButton';

type PlayButtonProps = {
  setIsPlaying: SetIsPlaying;
};

export function PlayButton({ setIsPlaying }: PlayButtonProps) {
  function handlePlay() {
    setIsPlaying(true);
  }

  return (
    <Button
      onClick={handlePlay}
      icon={<BsFillPlayFill />}
      aria-label='Tocar áudio'
    />
  );
}

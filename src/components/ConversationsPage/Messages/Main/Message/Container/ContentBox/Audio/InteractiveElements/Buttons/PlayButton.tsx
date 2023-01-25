import { BsFillPlayFill } from 'react-icons/bs';
import { SetIsPlaying } from '..';
import { Button } from './Button';

type PlayButtonProps = {
  play: HTMLAudioElement['play'];
  setIsPlaying: SetIsPlaying;
  isPlaying: boolean;
};

export function PlayButton({ play, setIsPlaying, isPlaying }: PlayButtonProps) {
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

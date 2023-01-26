import { BsFillPlayFill } from 'react-icons/bs';
import { SetIsPlaying } from '..';
import { Button } from './Button';

type PlayButtonProps = {
  setIsPlaying: SetIsPlaying;
  play: HTMLAudioElement['play'];
};

export function PlayButton({ setIsPlaying, play }: PlayButtonProps) {
  function handlePlay() {
    setIsPlaying(true);
    play();
  }

  return (
    <Button
      onClick={handlePlay}
      icon={<BsFillPlayFill />}
      aria-label='Tocar áudio'
    />
  );
}

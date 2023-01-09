import { BsFillPlayFill } from 'react-icons/bs';
import { Button } from './Button';
import { SetIsPlaying } from './CurrentButton';

type PlayButtonProps = {
  play: HTMLAudioElement['play'];
  setIsPlaying: SetIsPlaying;
};

export function PlayButton({ play, setIsPlaying }: PlayButtonProps) {
  function handlePlay() {
    play();
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

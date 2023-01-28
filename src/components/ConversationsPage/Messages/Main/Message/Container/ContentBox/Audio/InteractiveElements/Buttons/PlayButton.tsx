import { Button } from 'components/Audio/Buttons/Play';
import { SetIsPlaying } from './CurrentButton';

type PlayButtonProps = {
  setIsPlaying: SetIsPlaying;
};

export function PlayButton({ setIsPlaying }: PlayButtonProps) {
  function handlePlay() {
    setIsPlaying(true);
  }

  return <Button onClick={handlePlay} />;
}

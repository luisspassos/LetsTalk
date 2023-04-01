import { useAudio } from 'contexts/Audio/AudioContext';
import { BsFillPlayFill } from 'react-icons/bs';
import { Base } from './Base';
import { ButtonProps } from './CurrentButton';

export function PlayButton({ ...rest }: ButtonProps) {
  const { setIsPlaying } = useAudio();

  function handlePlay() {
    setIsPlaying(true);
  }

  return (
    <Base
      icon={<BsFillPlayFill />}
      aria-label='Tocar áudio'
      onClick={handlePlay}
      {...rest}
    />
  );
}

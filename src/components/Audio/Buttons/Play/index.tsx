import { useAudio } from 'contexts/Audio/AudioContext';
import { BsFillPlayFill } from 'react-icons/bs';
import { Base } from '../Base';
import { ButtonProps } from '../CurrentButton';

export type PlayButtonProps = ButtonProps;

export function PlayButton({ ...rest }: PlayButtonProps) {
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

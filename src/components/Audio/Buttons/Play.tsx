import { BsFillPlayFill } from 'react-icons/bs';
import { Base } from './Base';
import { ButtonProps } from './CurrentButton';

export function PlayButton({ setIsPlaying, ...rest }: ButtonProps) {
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

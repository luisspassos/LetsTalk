import { BsPauseFill } from 'react-icons/bs';
import { Base } from './Base';
import { ButtonProps } from './CurrentButton';

export function Pause({ setIsPlaying, ...rest }: ButtonProps) {
  function handlePause() {
    setIsPlaying(false);
  }

  return (
    <Base
      aria-label='Pausar áudio'
      icon={<BsPauseFill />}
      onClick={handlePause}
      {...rest}
    />
  );
}

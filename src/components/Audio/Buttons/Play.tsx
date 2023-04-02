import { useAudio } from 'contexts/Audio/AudioContext';
import { MutableRefObject } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { Base } from './Base';
import { ButtonProps } from './CurrentButton';

export type PlayButtonProps = {
  isPuttingToPlay: MutableRefObject<boolean>;
} & ButtonProps;

export function PlayButton({ isPuttingToPlay, ...rest }: PlayButtonProps) {
  const { setIsPlaying } = useAudio();

  function handlePlay() {
    setIsPlaying(true);
    isPuttingToPlay.current = true;
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

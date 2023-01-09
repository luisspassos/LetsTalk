import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PauseButton } from './PauseButton';
import { PlayButton } from './PlayButton';

type CurrentButtonProps = {
  audio: HTMLAudioElement;
};

export type SetIsPlaying = Dispatch<SetStateAction<boolean>>;

export function CurrentButton({ audio }: CurrentButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {}, []);

  const play = audio.play.bind(audio);
  const pause = audio.pause.bind(audio);

  if (isPlaying)
    return <PauseButton pause={pause} setIsPlaying={setIsPlaying} />;

  return <PlayButton play={play} setIsPlaying={setIsPlaying} />;
}

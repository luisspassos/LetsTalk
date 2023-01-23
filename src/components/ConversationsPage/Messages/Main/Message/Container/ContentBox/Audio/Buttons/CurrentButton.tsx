import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PauseButton } from './PauseButton';
import { PlayButton } from './PlayButton';
import { Event } from '../../Audio';
import { iterateEvents } from 'utils/iterateEvents';

type CurrentButtonProps = {
  audio: HTMLAudioElement;
};

export type SetIsPlaying = Dispatch<SetStateAction<boolean>>;

export function CurrentButton({ audio }: CurrentButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    function resetAudio() {
      setIsPlaying(false);
    }

    const events: Event[] = [
      {
        type: 'ended',
        func: resetAudio,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio]);

  const play = audio.play.bind(audio);
  const pause = audio.pause.bind(audio);

  if (isPlaying)
    return <PauseButton pause={pause} setIsPlaying={setIsPlaying} />;

  return <PlayButton play={play} setIsPlaying={setIsPlaying} />;
}

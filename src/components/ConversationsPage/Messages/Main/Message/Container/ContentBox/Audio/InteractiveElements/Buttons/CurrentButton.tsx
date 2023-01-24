import { useEffect } from 'react';
import { PauseButton } from './PauseButton';
import { PlayButton } from './PlayButton';
import { Event, SetIsPlaying } from '../../Audio';
import { iterateEvents } from 'utils/iterateEvents';

type CurrentButtonProps = {
  audio: HTMLAudioElement;
  setIsPlaying: SetIsPlaying;
  isPlaying: boolean;
};

export function CurrentButton({
  audio,
  setIsPlaying,
  isPlaying,
}: CurrentButtonProps) {
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
  }, [audio, setIsPlaying]);

  const play = audio.play.bind(audio);
  const pause = audio.pause.bind(audio);

  if (isPlaying)
    return <PauseButton pause={pause} setIsPlaying={setIsPlaying} />;

  return <PlayButton play={play} setIsPlaying={setIsPlaying} />;
}

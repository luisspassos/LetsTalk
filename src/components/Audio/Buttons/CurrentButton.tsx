import { useEffect } from 'react';
import { useAudio, h } from 'contexts/Audio/AudioContext';
import { IconButtonProps } from '@chakra-ui/react';
import { PauseButton as PauseButtonComponent } from './Pause';
import { PlayButton as PlayButtonComponent } from './Play';

export type ButtonProps = Omit<IconButtonProps, 'aria-label'>;

type Button = (props: ButtonProps) => JSX.Element;
type PlayButton = typeof PlayButtonComponent;

export type CurrentButtonProps = {
  PlayButton?: PlayButton;
  PauseButton?: Button;
};

export function CurrentButton({
  PauseButton = PauseButtonComponent,
  PlayButton = PlayButtonComponent,
}: CurrentButtonProps) {
  const { audio, iterateAudioEvents, isPlaying, setIsPlaying } = useAudio();

  // set audio events
  useEffect(() => {
    function resetAudio() {
      setIsPlaying(false);
    }

    const events = [
      h({
        type: 'ended',
        func: resetAudio,
      }),
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [iterateAudioEvents, setIsPlaying]);

  const play = audio?.element.play.bind(audio.element);
  const pause = audio?.element.pause.bind(audio.element);

  useEffect(() => {
    function pauseAudioWhenComponentLeavesScreen() {
      if (!isPlaying || pause === undefined) return;

      pause();
    }

    return pauseAudioWhenComponentLeavesScreen;
  }, [isPlaying, pause]);

  // handle play and pause
  useEffect(() => {
    // to prevent useEffect from executing below code on first render
    if (isPlaying === null) return;

    if (isPlaying === true) {
      if (play === undefined) return;

      play();
    } else {
      if (pause === undefined) return;

      pause();
    }
  }, [isPlaying, pause, play]);

  if (isPlaying) return <PauseButton />;

  return <PlayButton />;
}

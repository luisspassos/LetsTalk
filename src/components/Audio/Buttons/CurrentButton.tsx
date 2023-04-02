import { useEffect, useRef } from 'react';
import { useAudio, Event } from 'contexts/Audio/AudioContext';
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

  const isPuttingToPlay = useRef(false);

  // set audio events
  useEffect(() => {
    function resetAudio() {
      setIsPlaying(false);
    }

    function a() {
      isPuttingToPlay.current = false;
    }

    const events: Event[] = [
      {
        type: 'ended',
        func: resetAudio,
      },
      {
        type: 'play',
        func: a,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [iterateAudioEvents, setIsPlaying]);

  const play = audio?.element.play.bind(audio.element);
  const pause = audio?.element.pause.bind(audio.element);

  useEffect(() => {
    function stopAudioWhenComponentLeavesScreen() {
      if (
        isPlaying !== true ||
        pause === undefined ||
        isPuttingToPlay.current === true
      )
        return;

      console.log(isPuttingToPlay.current);

      setIsPlaying(false);
      pause();
    }

    return stopAudioWhenComponentLeavesScreen;
  }, [isPlaying, pause, setIsPlaying]);

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

  return <PlayButton isPuttingToPlay={isPuttingToPlay} />;
}

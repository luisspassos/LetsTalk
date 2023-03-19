import { AudioContextsProvider } from 'components/Audio/AudioContextsProvider';
import { Component, ComponentProps } from './Component';

type AudioPlayerProps = ComponentProps;

export function AudioPlayer(props: AudioPlayerProps) {
  return (
    <AudioContextsProvider>
      <Component {...props} />
    </AudioContextsProvider>
  );
}

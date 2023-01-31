import { AudioContextsProvider } from 'components/Audio/AudioContextsProvider';
import { Component } from './Component';

export function AudioPlayer() {
  return (
    <AudioContextsProvider>
      <Component />
    </AudioContextsProvider>
  );
}

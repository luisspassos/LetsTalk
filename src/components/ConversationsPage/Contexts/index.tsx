import { AudioRecordingProvider } from 'contexts/Audio/AudioRecordingContext';
import { AudiosPlayingProvider } from 'contexts/Audio/AudiosPlaying';
import { ReactNode } from 'react';

type ContextsProps = {
  children: ReactNode;
};

export function Contexts({ children }: ContextsProps) {
  return (
    <AudioRecordingProvider>
      <AudiosPlayingProvider>{children}</AudiosPlayingProvider>
    </AudioRecordingProvider>
  );
}

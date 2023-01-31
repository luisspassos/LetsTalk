import { AudioProvider } from 'contexts/Audio/AudioContext';
import { AudioPositionInPercentageProvider } from 'contexts/Audio/AudioPositionInPercentage';
import { ReactNode } from 'react';

type AudioContextsProvider = {
  children: ReactNode;
};

export function AudioContextsProvider({ children }: AudioContextsProvider) {
  return (
    <AudioProvider>
      <AudioPositionInPercentageProvider>
        {children}
      </AudioPositionInPercentageProvider>
    </AudioProvider>
  );
}

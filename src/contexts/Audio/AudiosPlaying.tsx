import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type AudioPlaying = boolean | null;

type AudiosPlayingProviderProps = {
  children: ReactNode;
};

type AudiosPlayingContextType = {
  audiosPlaying: AudioPlaying[];
  setAudiosPlaying: Dispatch<SetStateAction<AudioPlaying[]>>;
};

export const AudiosPlayingContext = createContext(
  {} as AudiosPlayingContextType
);

export function AudiosPlayingProvider({
  children,
}: AudiosPlayingProviderProps) {
  const [audiosPlaying, setAudiosPlaying] = useState<AudioPlaying[]>([]);

  return (
    <AudiosPlayingContext.Provider value={{ audiosPlaying, setAudiosPlaying }}>
      {children}
    </AudiosPlayingContext.Provider>
  );
}

export function useAudiosPlaying() {
  const data = useContext(AudiosPlayingContext);

  return data;
}

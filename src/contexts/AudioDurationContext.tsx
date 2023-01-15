import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type Duration = HTMLAudioElement['duration'];

type AudioDurationProviderProps = {
  children: ReactNode;
};

type AudioDurationContextType = {
  duration: Duration;
  setDuration: Dispatch<SetStateAction<number>>;
};

export const AudioDurationContext = createContext(
  {} as AudioDurationContextType
);

export function AudioDurationProvider({
  children,
}: AudioDurationProviderProps) {
  const [duration, setDuration] = useState<Duration>(0);

  return (
    <AudioDurationContext.Provider value={{ duration, setDuration }}>
      {children}
    </AudioDurationContext.Provider>
  );
}

export function useAudioDuration() {
  const data = useContext(AudioDurationContext);

  return data;
}

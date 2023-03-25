import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  Event as EventType,
  iterateEvents,
  IterateEventsWithoutTarget,
} from 'utils/iterateEvents';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = HTMLMediaElementEventMap;
export type Event = EventType<EventMap>;

type Audio = {
  index: number;
  element: HTMLAudioElement;
} | null;

type AudioProviderProps = {
  children: ReactNode;
};

type AudioContextType = {
  audio: Audio;
  setAudio: Dispatch<SetStateAction<Audio>>;
  iterateAudioEvents: IterateEventsWithoutTarget;
};

export const AudioContext = createContext({} as AudioContextType);

export function AudioProvider({ children }: AudioProviderProps) {
  const [audio, setAudio] = useState<Audio>(null);

  const iterateAudioEvents: IterateEventsWithoutTarget = (...params) => {
    if (audio?.element === undefined) return;

    iterateEvents(...params, audio?.element);
  };

  return (
    <AudioContext.Provider value={{ audio, setAudio, iterateAudioEvents }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const data = useContext(AudioContext);

  return data;
}

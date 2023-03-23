import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

type MediaRecorderType = MediaRecorder | null;

type AudioRecordingProviderProps = {
  children: ReactNode;
};

type AudioRecordingContextType = {
  mediaRecorder: MutableRefObject<MediaRecorderType>;
};

export const AudioRecordingContext = createContext(
  {} as AudioRecordingContextType
);

export function AudioRecordingProvider({
  children,
}: AudioRecordingProviderProps) {
  const mediaRecorder = useRef<MediaRecorderType>(null);

  return (
    <AudioRecordingContext.Provider value={{ mediaRecorder }}>
      {children}
    </AudioRecordingContext.Provider>
  );
}

export function useAudioRecording() {
  const data = useContext(AudioRecordingContext);

  return data;
}

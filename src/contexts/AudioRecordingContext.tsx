import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Event, iterateEvents } from 'utils/iterateEvents';

type RecorderEvent = Event<MediaRecorderEventMap>;

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
  const audioBlob = useRef<Blob | null>(null);

  useEffect(() => {
    const recorder = mediaRecorder.current;

    if (recorder === null) return;

    function getAudioBlob(e: BlobEvent) {
      audioBlob.current = e.data;

      console.log(e.data);
    }

    const events: RecorderEvent[] = [
      {
        type: 'dataavailable',
        func: getAudioBlob,
      },
    ];

    iterateEvents('add', events, recorder);

    return () => {
      iterateEvents('remove', events, recorder);
    };
  }, []);

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

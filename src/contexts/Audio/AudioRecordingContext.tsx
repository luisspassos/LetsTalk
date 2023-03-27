import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Event,
  iterateEvents,
  IterateEventsWithoutTarget,
} from 'utils/iterateEvents';

export type RecorderEvent = Event<MediaRecorderEventMap>;

type MediaRecorderType = MediaRecorder | null;

type AudioBlob = Blob | null;

type AudioRecordingProviderProps = {
  children: ReactNode;
};

type AudioRecordingContextType = {
  mediaRecorder: {
    value: MediaRecorderType;
    set: Dispatch<SetStateAction<MediaRecorderType>>;
  };
  audioBlob: AudioBlob;
  setAudioBlobs: Dispatch<SetStateAction<Blob[]>>;
  iterateRecorderEvents: IterateEventsWithoutTarget;
};

export const AudioRecordingContext = createContext(
  {} as AudioRecordingContextType
);

export function AudioRecordingProvider({
  children,
}: AudioRecordingProviderProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorderType>(null);
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const audioBlob =
    !mediaRecorder?.mimeType || audioBlobs.length === 0
      ? null
      : new Blob(audioBlobs, {
          type: mediaRecorder.mimeType,
        });

  const iterateRecorderEvents: IterateEventsWithoutTarget = useCallback(
    (...params) => {
      if (mediaRecorder === null) return;

      iterateEvents(...params, mediaRecorder);
    },
    [mediaRecorder]
  );

  // set events
  useEffect(() => {
    if (mediaRecorder === null) return;

    async function getAudioBlob(e: BlobEvent) {
      setAudioBlobs((prev) => [...prev, e.data]);
    }

    const events: RecorderEvent[] = [
      {
        type: 'dataavailable',
        func: getAudioBlob,
      },
    ];

    iterateRecorderEvents('add', events);

    return () => {
      iterateRecorderEvents('remove', events);
    };
  }, [iterateRecorderEvents, mediaRecorder]);

  return (
    <AudioRecordingContext.Provider
      value={{
        mediaRecorder: { value: mediaRecorder, set: setMediaRecorder },
        audioBlob: audioBlob,
        setAudioBlobs,
        iterateRecorderEvents,
      }}
    >
      {children}
    </AudioRecordingContext.Provider>
  );
}

export function useAudioRecording() {
  const data = useContext(AudioRecordingContext);

  return data;
}

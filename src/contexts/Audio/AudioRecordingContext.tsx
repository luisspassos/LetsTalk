import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Event,
  iterateEvents,
  IterateEventsWithoutTarget,
} from 'utils/iterateEvents';

export type RecorderEvent = Event<MediaRecorderEventMap>;

type DurationStart = number | null;

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
  duration: {
    valueInSeconds: number;
    set: Dispatch<SetStateAction<number>>;
    start: MutableRefObject<DurationStart>;
  };
  audioBlob: AudioBlob;
  setAudioBlobs: Dispatch<SetStateAction<Blob[]>>;
  resetAudioRecording: () => void;
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

  const [duration, setDuration] = useState(0); // in milliseconds;
  const durationInSeconds = duration / 1000;
  const durationStart = useRef<DurationStart>(null);

  const resetAudioRecording = () => {
    setAudioBlobs([]);
    setMediaRecorder(null);
  };

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
        duration: {
          valueInSeconds: durationInSeconds,
          set: setDuration,
          start: durationStart,
        },
        audioBlob: audioBlob,
        setAudioBlobs,
        resetAudioRecording,
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

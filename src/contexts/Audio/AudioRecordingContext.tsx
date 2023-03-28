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
    durations: {
      value: number[];
      set: Dispatch<SetStateAction<number[]>>;
    };
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

  const [durations, setDurations] = useState([]); // in milliseconds;
  const durationInSeconds = durations.reduce((acc, currentValue) => {
    const seconds = currentValue / 1000;

    return acc + seconds;
  });

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
          durations: { value: durations, set: setDurations },
          valueInSeconds: durationInSeconds,
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

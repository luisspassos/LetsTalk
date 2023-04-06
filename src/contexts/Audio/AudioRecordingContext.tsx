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

type Durations = number[];

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
  durations: Durations;
  setDurations: Dispatch<SetStateAction<Durations>>;
  durationInSeconds: number;
  audioBlob: AudioBlob;
  setAudioBlobs: Dispatch<SetStateAction<Blob[]>>;
  resetAudioRecording: () => void;
  iterateRecorderEvents: IterateEventsWithoutTarget;
  stopStream: () => void;
};

export const AudioRecordingContext = createContext(
  {} as AudioRecordingContextType
);

export function AudioRecordingProvider({
  children,
}: AudioRecordingProviderProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorderType>(null);

  const stopStream = useCallback(() => {
    const tracks = mediaRecorder?.stream.getTracks();

    if (tracks === undefined) return;

    for (const track of tracks) {
      track.stop();
    }
  }, [mediaRecorder?.stream]);

  useEffect(() => {
    function StopAudioWhenLeavingPage() {
      if (mediaRecorder === null) return;

      stopStream();
    }

    return StopAudioWhenLeavingPage;
  }, [mediaRecorder, stopStream]);

  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const audioBlob =
    !mediaRecorder?.mimeType || audioBlobs.length === 0
      ? null
      : new Blob(audioBlobs, {
          type: mediaRecorder.mimeType,
        });

  const [durations, setDurations] = useState<Durations>([]); // in milliseconds;
  const durationInSeconds = durations.reduce((acc, currentValue) => {
    const seconds = currentValue / 1000;

    return acc + seconds;
  }, 0);

  const resetAudioRecording = () => {
    setAudioBlobs([]);
    setMediaRecorder(null);
    setDurations([]);
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
        durations: durations,
        durationInSeconds: durationInSeconds,
        setDurations: setDurations,
        audioBlob: audioBlob,
        setAudioBlobs,
        resetAudioRecording,
        iterateRecorderEvents,
        stopStream,
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

import {
  RecorderEvent,
  useAudioRecording,
} from 'contexts/Audio/AudioRecordingContext';
import { useEffect, useRef } from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { Props } from '..';
import { IconButton } from '../IconButton';

type UnpauseButtonProps = Props;

export function UnpauseButton({ setCurrentComponent }: UnpauseButtonProps) {
  const { mediaRecorder, iterateRecorderEvents } = useAudioRecording();
  const events = useRef<RecorderEvent[]>([]);

  useEffect(() => {
    return () => {
      iterateRecorderEvents('remove', events.current);
    };
  }, [iterateRecorderEvents]);

  function handleUnpause() {
    function resume() {
      setCurrentComponent('recording');
    }

    events.current = [
      {
        type: 'resume',
        func: resume,
      },
    ];

    iterateRecorderEvents('add', events.current);

    mediaRecorder.value?.resume();
  }

  return (
    <IconButton
      onClick={handleUnpause}
      icon={<BsPlayCircle />}
      aria-label='Despausar'
    />
  );
}

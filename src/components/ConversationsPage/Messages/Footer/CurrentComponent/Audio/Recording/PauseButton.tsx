import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { BsPauseCircle } from 'react-icons/bs';
import { Props } from '..';
import { IconButton } from '../IconButton';

type PauseButtonProps = Props;

export function PauseButton({ setCurrentComponent }: PauseButtonProps) {
  const { mediaRecorder } = useAudioRecording();

  function handlePause() {
    mediaRecorder.value?.addEventListener('pause', () => {
      mediaRecorder.value?.requestData();
      setCurrentComponent('paused');
    });

    mediaRecorder.value?.pause();
  }

  return (
    <IconButton
      onClick={handlePause}
      icon={<BsPauseCircle />}
      aria-label='Pausar'
    />
  );
}

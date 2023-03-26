import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { BsPlayCircle } from 'react-icons/bs';
import { Props } from '..';
import { IconButton } from '../IconButton';

type UnpauseButtonProps = Props;

export function UnpauseButton({ setCurrentComponent }: UnpauseButtonProps) {
  const { mediaRecorder } = useAudioRecording();

  function handleUnpause() {
    mediaRecorder.value?.addEventListener('resume', () => {
      setCurrentComponent('recording');
    });

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

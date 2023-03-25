import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { BsFillStopFill } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../RightButtonBase/BaseWithTooltip';

type StopButtonProps = Props;

export function StopButton({ setCurrentComponent }: StopButtonProps) {
  const { mediaRecorder } = useAudioRecording();

  function handleStopAudio() {
    mediaRecorder.value?.addEventListener('stop', () => {
      setCurrentComponent('send');
    });

    mediaRecorder.value?.stop();

    function stopStream() {
      const tracks = mediaRecorder.value?.stream.getTracks();

      if (tracks === undefined) return;

      for (const track of tracks) {
        track.stop();
      }
    }

    stopStream();
  }

  return (
    <BaseWithTooltip
      onClick={handleStopAudio}
      icon={BsFillStopFill}
      label='Parar áudio'
      fontSize='30px'
    />
  );
}

import { useAudioRecording } from 'contexts/AudioRecordingContext';
import { BsFillStopFill } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../RightButtonBase/BaseWithTooltip';

type StopButtonProps = Props;

export function StopButton({ setCurrentComponent }: StopButtonProps) {
  const { mediaRecorder } = useAudioRecording();

  function handleStopAudio() {
    const recorder = mediaRecorder.current;

    recorder?.addEventListener('stop', () => {
      setCurrentComponent('send');
    });

    recorder?.stop();

    function stopStream() {
      const tracks = recorder?.stream.getTracks();

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

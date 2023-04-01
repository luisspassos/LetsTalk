import { CurrentComponent } from 'components/ConversationsPage/Messages/Footer/CurrentComponent/Audio';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { Dispatch, SetStateAction } from 'react';

type Params = {
  setCurrentComponent: Dispatch<SetStateAction<CurrentComponent>> | undefined;
  componentToDisplay: CurrentComponent;
};

export function useStopAudio({
  componentToDisplay,
  setCurrentComponent,
}: Params) {
  const { mediaRecorder } = useAudioRecording();

  function stopAudio() {
    if (setCurrentComponent === undefined) return;

    mediaRecorder.value?.addEventListener('stop', () => {
      setCurrentComponent(componentToDisplay);
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

  return { stopAudio };
}
